import type { PatrimonyData, BankAccount, Investment } from '../types';

const STORAGE_KEY = 'patrimony-data';

export const defaultData: PatrimonyData = {
  bankAccounts: [],
  investments: [],
};

export const loadData = (): PatrimonyData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return defaultData;
};

export const saveData = (data: PatrimonyData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

export const addBankAccount = (account: Omit<BankAccount, 'id' | 'lastUpdated'>): BankAccount => {
  const newAccount: BankAccount = {
    ...account,
    id: crypto.randomUUID(),
    lastUpdated: new Date().toISOString(),
  };
  
  const data = loadData();
  data.bankAccounts.push(newAccount);
  saveData(data);
  
  return newAccount;
};

export const updateBankAccount = (id: string, updates: Partial<Omit<BankAccount, 'id'>>): void => {
  const data = loadData();
  const index = data.bankAccounts.findIndex(acc => acc.id === id);
  
  if (index !== -1) {
    data.bankAccounts[index] = {
      ...data.bankAccounts[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    saveData(data);
  }
};

export const deleteBankAccount = (id: string): void => {
  const data = loadData();
  data.bankAccounts = data.bankAccounts.filter(acc => acc.id !== id);
  saveData(data);
};

export const addInvestment = (investment: Omit<Investment, 'id' | 'lastUpdated'>): Investment => {
  const newInvestment: Investment = {
    ...investment,
    id: crypto.randomUUID(),
    lastUpdated: new Date().toISOString(),
  };
  
  const data = loadData();
  data.investments.push(newInvestment);
  saveData(data);
  
  return newInvestment;
};

export const updateInvestment = (id: string, updates: Partial<Omit<Investment, 'id'>>): void => {
  const data = loadData();
  const index = data.investments.findIndex(inv => inv.id === id);
  
  if (index !== -1) {
    data.investments[index] = {
      ...data.investments[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    saveData(data);
  }
};

export const deleteInvestment = (id: string): void => {
  const data = loadData();
  data.investments = data.investments.filter(inv => inv.id !== id);
  saveData(data);
};