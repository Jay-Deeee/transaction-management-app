import { useState } from 'react'
import TransactionList from './components/TransactionList';
import './styles/index.css'

function App() {
  return (
    <div>
      <h1 className='header'>Transaction Management System</h1>
      <TransactionList />
    </div>
  );
}

export default App
