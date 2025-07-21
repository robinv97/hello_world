import React, { useState } from 'react';
import { Edit2, Trash2, TrendingUp, TrendingDown, Calendar, Hash } from 'lucide-react';
import { formatCurrency, formatPercentage, getInvestmentTypeLabel, getInvestmentGainLoss } from '../utils/calculations';
import { deleteInvestment } from '../utils/storage';
import EditInvestmentModal from './EditInvestmentModal';
import type { PatrimonyData, Investment } from '../types';

interface InvestmentsProps {
  data: PatrimonyData;
  onDataChange: () => void;
}

const Investments: React.FC<InvestmentsProps> = ({ data, onDataChange }) => {
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const handleDelete = (investmentId: string) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      deleteInvestment(investmentId);
      onDataChange();
    }
  };

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
  };

  const handleEditSuccess = () => {
    setEditingInvestment(null);
    onDataChange();
  };

  const totalValue = data.investments.reduce((sum, investment) => {
    return sum + (investment.quantity * investment.currentPrice);
  }, 0);

  const totalCost = data.investments.reduce((sum, investment) => {
    return sum + (investment.quantity * investment.purchasePrice);
  }, 0);

  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Investments</h2>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Total Value: {formatCurrency(totalValue)}</span>
            <span className={`flex items-center ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {formatCurrency(totalGainLoss)} ({formatPercentage(totalGainLossPercentage)})
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {data.investments.length} investment{data.investments.length !== 1 ? 's' : ''}
        </div>
      </div>

      {data.investments.length === 0 ? (
        <div className="card text-center py-12">
          <div className="p-3 bg-gray-100 rounded-lg inline-block mb-4">
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Investments</h3>
          <p className="text-gray-600">Add your first investment to start tracking your portfolio performance.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.investments.map((investment) => {
            const { gainLoss, gainLossPercentage, currentValue } = getInvestmentGainLoss(investment);
            
            return (
              <div key={investment.id} className="card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{investment.name}</h3>
                    {investment.symbol && (
                      <p className="text-sm text-gray-600 font-mono">{investment.symbol}</p>
                    )}
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {getInvestmentTypeLabel(investment.type)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(investment)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(investment.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Quantity</p>
                      <p className="text-sm font-medium">{investment.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Price</p>
                      <p className="text-sm font-medium">{formatCurrency(investment.currentPrice)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(currentValue, investment.currency)}
                    </p>
                  </div>

                  <div className={`flex items-center ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {gainLoss >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    <span className="text-sm font-medium">
                      {formatCurrency(gainLoss)} ({formatPercentage(gainLossPercentage)})
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <div>
                        <p>Purchase Price</p>
                        <p className="font-medium">{formatCurrency(investment.purchasePrice)}</p>
                      </div>
                      <div>
                        <p>Last Updated</p>
                        <p className="font-medium">{new Date(investment.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <EditInvestmentModal
        investment={editingInvestment}
        isOpen={!!editingInvestment}
        onClose={() => setEditingInvestment(null)}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default Investments;