import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AccountSummary from './components/AccountSummary';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface Transaction {
  id: number;
  amount: number;  // Ensure this is always a number
  description: string;
  source: string;
  date: string;
  category: string;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'summary' | 'form' | 'list'>('summary');

  useEffect(() => {
    // Add 10 sample transactions
    const sampleTransactions: Transaction[] = [
      { id: 1, amount: 50.00, description: "Groceries", source: "Cash (USD)", date: "2023-05-01", category: "Food" },
      { id: 2, amount: 30.00, description: "Gas", source: "Zelle", date: "2023-05-02", category: "Transportation" },
      { id: 3, amount: 100.00, description: "Electricity bill", source: "Banco Provincial (VES)", date: "2023-05-03", category: "Utilities" },
      { id: 4, amount: 20.00, description: "Movie tickets", source: "Cash (USD)", date: "2023-05-04", category: "Entertainment" },
      { id: 5, amount: 75.00, description: "Dinner out", source: "Zelle", date: "2023-05-05", category: "Food" },
      { id: 6, amount: 200.00, description: "New shoes", source: "Cash (USD)", date: "2023-05-06", category: "Shopping" },
      { id: 7, amount: 15.00, description: "Book", source: "Zelle", date: "2023-05-07", category: "Education" },
      { id: 8, amount: 50.00, description: "Internet bill", source: "Banco Provincial (VES)", date: "2023-05-08", category: "Utilities" },
      { id: 9, amount: 40.00, description: "Haircut", source: "Cash (USD)", date: "2023-05-09", category: "Personal Care" },
      { id: 10, amount: 60.00, description: "Phone bill", source: "Zelle", date: "2023-05-10", category: "Utilities" }
    ];
    setTransactions(sampleTransactions);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prevTransactions => [...prevTransactions, { ...transaction, id: Date.now() }]);
  };

  const editTransaction = (id: number, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prevTransactions => 
      prevTransactions.map(t => t.id === id ? { ...updatedTransaction, id } : t)
    );
  };

  const removeTransaction = (id: number) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <h1>FamApp</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <nav>
        <button onClick={() => setActiveComponent('summary')}>Summary</button>
        <button onClick={() => setActiveComponent('form')}>Add Transaction</button>
        <button onClick={() => setActiveComponent('list')}>Transactions</button>
      </nav>
      <div className="app-container">
        <TransitionGroup>
          <CSSTransition
            key={activeComponent}
            timeout={300}
            classNames="fade"
          >
            <div className="component-container">
              {activeComponent === 'summary' && <AccountSummary transactions={transactions} isDarkMode={isDarkMode} />}
              {activeComponent === 'form' && <TransactionForm addTransaction={addTransaction} isDarkMode={isDarkMode} />}
              {activeComponent === 'list' && (
                <TransactionList 
                  transactions={transactions} 
                  editTransaction={editTransaction}
                  removeTransaction={removeTransaction}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default App;