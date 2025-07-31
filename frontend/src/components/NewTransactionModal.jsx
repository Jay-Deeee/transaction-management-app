import { useState } from 'react';
import axios from 'axios';

function NewTransactionModal({ onSuccess }) {
  const [form, setForm] = useState({
    transaction_date: '',
    account_number: '',
    account_holder_name: '',
    amount: '',
  });
  const [holderNameError, setHolderNameError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidHolderName = (value) => {
    return /^[a-zA-Z\s]+$/.test(value);
  };

  const isValidAccountNumber = (value) => {
    return /^\d{4}-\d{4}-\d{4}$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidHolderName(form.account_holder_name)) {
      setHolderNameError("Holder Name must contain only letters.");
    } else {
      setHolderNameError("");
    }

    if (!isValidAccountNumber(form.account_number)) {
      setAccountNumberError("Account Number must be in the format XXXX-XXXX-XXXX");
    } else {
      setAccountNumberError("");
    }

    if (!isValidAccountNumber(form.account_number) || !isValidHolderName(form.account_holder_name)) {
      return;
    }

    axios.post('http://localhost:3000/transactions', form)
      .then(() => {
        onSuccess();
        document.getElementById('closeModalBtn').click();
        showAlert("Transaction successfully added.", "success");
      })
      .catch(error => {
        console.error('Error creating transaction:', error);
        showAlert("There was a problem adding the transaction.", "danger");
      });
  };

  const showAlert = (message, type) => {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertBox.style.zIndex = 1055;
    alertBox.role = "alert";
    alertBox.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.classList.remove("show");
      alertBox.addEventListener("transitionend", () => alertBox.remove());
    }, 3000);
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
                <input 
                  type="text" 
                  className={`form-control ${accountNumberError ? 'is-invalid' : ''}`} 
                  name="account_number" 
                  value={form.account_number} 
                  onChange={handleChange} 
                  required 
                />
                {accountNumberError && <div className="invalid-feedback">{accountNumberError}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Holder Name</label>
                <input 
                  type="text" 
                  className={`form-control ${holderNameError ? 'is-invalid' : ''}`} 
                  name="account_holder_name" 
                  value={form.account_holder_name} 
                  onChange={handleChange} 
                  required 
                />
                {holderNameError && <div className="invalid-feedback">{holderNameError}</div>}
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
