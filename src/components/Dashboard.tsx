import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Target } from 'lucide-react';
import { calculatePatrimonySummary, formatCurrency, formatPercentage, getAccountTypeLabel, getInvestmentTypeLabel } from '../utils/calculations';
import type { PatrimonyData } from '../types';

interface DashboardProps {
  data: PatrimonyData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const summary = calculatePatrimonySummary(data);

  // Prepare data for wealth distribution chart
  const wealthDistribution = [
    { name: 'Bank Accounts', value: summary.totalBankBalance, color: '#0ea5e9' },
    { name: 'Investments', value: summary.totalInvestmentValue, color: '#10b981' },
  ].filter(item => item.value > 0);

  // Prepare data for account types chart
  const accountTypesData = data.bankAccounts.reduce((acc, account) => {
    const type = getAccountTypeLabel(account.accountType);
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value += account.balance;
    } else {
      acc.push({ name: type, value: account.balance });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Prepare data for investment types chart
  const investmentTypesData = data.investments.reduce((acc, investment) => {
    const type = getInvestmentTypeLabel(investment.type);
    const value = investment.quantity * investment.currentPrice;
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value += value;
    } else {
      acc.push({ name: type, value });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    trend?: {
      value: string;
      isPositive: boolean;
    };
  }> = ({ title, value, icon, trend }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span className="text-sm font-medium">{trend.value}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-100 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Wealth"
          value={formatCurrency(summary.totalWealth)}
          icon={<DollarSign className="h-6 w-6 text-primary-600" />}
        />
        
        <StatCard
          title="Bank Accounts"
          value={formatCurrency(summary.totalBankBalance)}
          icon={<PiggyBank className="h-6 w-6 text-primary-600" />}
        />
        
        <StatCard
          title="Investments"
          value={formatCurrency(summary.totalInvestmentValue)}
          icon={<Target className="h-6 w-6 text-primary-600" />}
        />
        
        <StatCard
          title="Investment P&L"
          value={formatCurrency(summary.totalGainLoss)}
          icon={summary.totalGainLoss >= 0 ? <TrendingUp className="h-6 w-6 text-green-600" /> : <TrendingDown className="h-6 w-6 text-red-600" />}
          trend={{
            value: formatPercentage(summary.gainLossPercentage),
            isPositive: summary.totalGainLoss >= 0,
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wealth Distribution</h3>
          {wealthDistribution.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wealthDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wealthDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No data to display
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Types</h3>
          {accountTypesData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accountTypesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No bank accounts to display
            </div>
          )}
        </div>
      </div>

      {investmentTypesData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investmentTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {data.bankAccounts.length === 0 && data.investments.length === 0 && (
        <div className="card text-center py-12">
          <div className="p-3 bg-gray-100 rounded-lg inline-block mb-4">
            <PiggyBank className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Patrimony Tracker</h3>
          <p className="text-gray-600 mb-4">Start by adding your bank accounts and investments to track your wealth.</p>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">Add Bank Account</button>
            <button className="btn-secondary">Add Investment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;