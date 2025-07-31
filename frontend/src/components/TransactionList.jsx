import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTransactionModal from './NewTransactionModal';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    axios.get('http://localhost:3000/transactions')
      .then(response => {
        const sorted = response.data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        setTransactions(sorted);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Transactions</h2>
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#newTransactionModal">
          + New Transaction
        </button>
      </div>

      <table className="table table-bordered table-hover table-striped">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Account Number</th>
            <th>Holder Name</th>
            <th>Amount (USD)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.transactionDate}</td>
              <td>{tx.accountNumber}</td>
              <td>{tx.accountHolderName}</td>
              <td>$ {tx.amount}</td>
              <td className={
                tx.status === 'Settled' ? 'text-success' :
                tx.status === 'Pending' ? 'text-pending' :
                'text-danger'
              }>
                {tx.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NewTransactionModal onSuccess={fetchTransactions} />
    </div>
  );
}

export default TransactionList;
