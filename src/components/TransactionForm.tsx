import React, { useState, FormEvent } from 'react';
import { Transaction } from '../App';

interface Props {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  isDarkMode: boolean;
}

const TransactionForm: React.FC<Props> = ({ addTransaction, isDarkMode }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTransaction({
      amount: parseFloat(amount) || 0,  // Convert to number, default to 0 if NaN
      description,
      source,
      date: new Date().toISOString(),
      category,
    });
    setAmount('');
    setDescription('');
    setSource('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className={`transaction-form ${isDarkMode ? 'dark' : ''}`}>
      <h2>Add New Transaction</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
      >
        <option value="">Select source</option>
        <option value="Cash (USD)">Cash (USD)</option>
        <option value="Zelle">Zelle</option>
        <option value="Banco Provincial (VES)">Banco Provincial (VES)</option>
      </select>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;