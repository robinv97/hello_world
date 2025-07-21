import React, { useState, useEffect } from 'react';
import { PiggyBank, TrendingUp, Home, Plus } from 'lucide-react';
import Dashboard from './components/Dashboard';
import BankAccounts from './components/BankAccounts';
import Investments from './components/Investments';
import AddBankAccountModal from './components/AddBankAccountModal';
import AddInvestmentModal from './components/AddInvestmentModal';
import { loadData } from './utils/storage';
import type { PatrimonyData } from './types';

type ActiveTab = 'dashboard' | 'accounts' | 'investments';

function App() {
  const [data, setData] = useState<PatrimonyData>(() => loadData());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false);

  const refreshData = () => {
    setData(loadData());
  };

  useEffect(() => {
    // Set up storage event listener to sync across tabs
    const handleStorageChange = () => {
      setData(loadData());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'accounts' as const, label: 'Bank Accounts', icon: PiggyBank },
    { id: 'investments' as const, label: 'Investments', icon: TrendingUp },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={data} />;
      case 'accounts':
        return <BankAccounts data={data} onDataChange={refreshData} />;
      case 'investments':
        return <Investments data={data} onDataChange={refreshData} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  const handleAddClick = () => {
    if (activeTab === 'accounts') {
      setShowAddAccountModal(true);
    } else if (activeTab === 'investments') {
      setShowAddInvestmentModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <PiggyBank className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Patrimony Tracker</h1>
                <p className="text-sm text-gray-500">Track your wealth and investments</p>
              </div>
            </div>
            
            {(activeTab === 'accounts' || activeTab === 'investments') && (
              <button
                onClick={handleAddClick}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>
                  Add {activeTab === 'accounts' ? 'Account' : 'Investment'}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>

      <AddBankAccountModal
        isOpen={showAddAccountModal}
        onClose={() => setShowAddAccountModal(false)}
        onSuccess={refreshData}
      />

      <AddInvestmentModal
        isOpen={showAddInvestmentModal}
        onClose={() => setShowAddInvestmentModal(false)}
        onSuccess={refreshData}
      />
    </div>
  );
}

export default App;