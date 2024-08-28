import React, { useState } from 'react';
import { Transaction } from '../App';

interface Props {
  transactions: Transaction[];
  editTransaction: (id: number, updatedTransaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: number) => void;
  isDarkMode: boolean;  // Add this line
}

const TransactionList: React.FC<Props> = ({ transactions, editTransaction, removeTransaction }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Transaction, 'id'>>({
    amount: 0,
    description: '',
    source: '',
    date: '',
    category: ''
  });

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditForm(transaction);
  };

  const handleSave = () => {
    if (editingId !== null) {
      editTransaction(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            {editingId === transaction.id ? (
              <div className="edit-form">
                <input
                  type="number"
                  name="amount"
                  value={editForm.amount}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                />
                <select
                  name="source"
                  value={editForm.source}
                  onChange={handleChange}
                >
                  <option value="Cash (USD)">Cash (USD)</option>
                  <option value="Zelle">Zelle</option>
                  <option value="Banco Provincial (VES)">Banco Provincial (VES)</option>
                </select>
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleChange}
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <>
                <span className="transaction-amount">
                  ${typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : '0.00'}
                </span>
                <span className="transaction-details">
                  {transaction.description} - {transaction.source} - {transaction.category}
                </span>
                <div className="transaction-actions">
                  <button onClick={() => handleEdit(transaction)}>Edit</button>
                  <button onClick={() => removeTransaction(transaction.id)}>Remove</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;