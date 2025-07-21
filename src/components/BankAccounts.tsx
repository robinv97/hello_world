import React, { useState } from 'react';
import { Edit2, Trash2, Building2, Calendar } from 'lucide-react';
import { formatCurrency, getAccountTypeLabel } from '../utils/calculations';
import { deleteBankAccount, updateBankAccount } from '../utils/storage';
import EditBankAccountModal from './EditBankAccountModal';
import type { PatrimonyData, BankAccount } from '../types';

interface BankAccountsProps {
  data: PatrimonyData;
  onDataChange: () => void;
}

const BankAccounts: React.FC<BankAccountsProps> = ({ data, onDataChange }) => {
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);

  const handleDelete = (accountId: string) => {
    if (window.confirm('Are you sure you want to delete this bank account?')) {
      deleteBankAccount(accountId);
      onDataChange();
    }
  };

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
  };

  const handleEditSuccess = () => {
    setEditingAccount(null);
    onDataChange();
  };

  const totalBalance = data.bankAccounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bank Accounts</h2>
          <p className="text-gray-600">Total Balance: {formatCurrency(totalBalance)}</p>
        </div>
        <div className="text-sm text-gray-500">
          {data.bankAccounts.length} account{data.bankAccounts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {data.bankAccounts.length === 0 ? (
        <div className="card text-center py-12">
          <div className="p-3 bg-gray-100 rounded-lg inline-block mb-4">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bank Accounts</h3>
          <p className="text-gray-600">Add your first bank account to start tracking your cash balances.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.bankAccounts.map((account) => (
            <div key={account.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-600">{account.bank}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {getAccountTypeLabel(account.accountType)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(account.balance, account.currency)}
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Last updated: {new Date(account.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditBankAccountModal
        account={editingAccount}
        isOpen={!!editingAccount}
        onClose={() => setEditingAccount(null)}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default BankAccounts;