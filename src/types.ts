export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  accountType: 'checking' | 'savings' | 'money_market' | 'cd';
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'mutual_funds' | 'etf' | 'crypto' | 'real_estate' | 'other';
  symbol?: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
  currency: string;
  lastUpdated: string;
}

export interface PatrimonyData {
  bankAccounts: BankAccount[];
  investments: Investment[];
}

export interface PatrimonySummary {
  totalBankBalance: number;
  totalInvestmentValue: number;
  totalWealth: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  currency: string;
}