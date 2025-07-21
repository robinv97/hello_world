import type { PatrimonyData, PatrimonySummary, BankAccount, Investment } from '../types';

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const calculatePatrimonySummary = (data: PatrimonyData): PatrimonySummary => {
  const totalBankBalance = data.bankAccounts.reduce((sum, account) => sum + account.balance, 0);
  
  const totalInvestmentValue = data.investments.reduce((sum, investment) => {
    return sum + (investment.quantity * investment.currentPrice);
  }, 0);
  
  const totalInvestmentCost = data.investments.reduce((sum, investment) => {
    return sum + (investment.quantity * investment.purchasePrice);
  }, 0);
  
  const totalWealth = totalBankBalance + totalInvestmentValue;
  const totalGainLoss = totalInvestmentValue - totalInvestmentCost;
  const gainLossPercentage = totalInvestmentCost > 0 ? (totalGainLoss / totalInvestmentCost) * 100 : 0;
  
  return {
    totalBankBalance,
    totalInvestmentValue,
    totalWealth,
    totalGainLoss,
    gainLossPercentage,
    currency: 'USD', // Default currency
  };
};

export const getAccountTypeLabel = (type: BankAccount['accountType']): string => {
  const labels = {
    checking: 'Checking',
    savings: 'Savings',
    money_market: 'Money Market',
    cd: 'Certificate of Deposit',
  };
  return labels[type];
};

export const getInvestmentTypeLabel = (type: Investment['type']): string => {
  const labels = {
    stocks: 'Stocks',
    bonds: 'Bonds',
    mutual_funds: 'Mutual Funds',
    etf: 'ETF',
    crypto: 'Cryptocurrency',
    real_estate: 'Real Estate',
    other: 'Other',
  };
  return labels[type];
};

export const getInvestmentGainLoss = (investment: Investment) => {
  const currentValue = investment.quantity * investment.currentPrice;
  const purchaseValue = investment.quantity * investment.purchasePrice;
  const gainLoss = currentValue - purchaseValue;
  const gainLossPercentage = purchaseValue > 0 ? (gainLoss / purchaseValue) * 100 : 0;
  
  return {
    gainLoss,
    gainLossPercentage,
    currentValue,
    purchaseValue,
  };
};