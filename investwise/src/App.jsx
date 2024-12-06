import React, { useState } from 'react';
import { BookOpen, LayoutDashboard, PlusCircle } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { DecisionForm } from './components/DecisionForm';
import { DecisionHistory } from './components/DecisonHistory';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Investment Journal
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value )}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="dashboard">Dashboard</option>
              <option value="new">New Decision</option>
              <option value="history">History</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`${
                    activeTab === 'new'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  New Decision
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  History
                </button>
              </nav>
            </div>
          </div>
        </div>

        <main className="space-y-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'new' && <DecisionForm />}
          {activeTab === 'history' && <DecisionHistory />}
        </main>
      </div>
    </div>
  );
}

export default App;