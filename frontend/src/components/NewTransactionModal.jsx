import { useState } from 'react';
import axios from 'axios';

function NewTransactionModal({ onSuccess }) {
  const [form, setForm] = useState({
    transaction_date: '',
    account_number: '',
    account_holder_name: '',
    amount: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/transactions', form)
      .then(() => {
        onSuccess();
        document.getElementById('closeModalBtn').click();
      })
      .catch(error => {
        console.error('Error creating transaction:', error);
      });
  };

  return (
    <div className="modal fade" id="newTransactionModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">New Transaction</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" name="transaction_date" value={form.transaction_date} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Account Number</label>
                <input type="text" className="form-control" name="account_number" value={form.account_number} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Holder Name</label>
                <input type="text" className="form-control" name="account_holder_name" value={form.account_holder_name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" name="amount" value={form.amount} onChange={handleChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary">Add Transaction</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTransactionModal;
