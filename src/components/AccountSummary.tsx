import React from 'react';
import { Transaction } from '../App';

interface Props {
  transactions: Transaction[];
  isDarkMode: boolean;
}

const AccountSummary: React.FC<Props> = ({ transactions, isDarkMode }) => {
  const calculateBalance = (source: string) => {
    return transactions
      .filter((t) => t.source === source)
      .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
  };

  return (
    <div className={`account-summary ${isDarkMode ? 'dark' : ''}`}>
      <h2>Account Summary</h2>
      <p>Cash (USD): ${calculateBalance('Cash (USD)').toFixed(2)}</p>
      <p>Zelle: ${calculateBalance('Zelle').toFixed(2)}</p>
      <p>Banco Provincial (VES): ${calculateBalance('Banco Provincial (VES)').toFixed(2)}</p>
    </div>
  );
};

export default AccountSummary;