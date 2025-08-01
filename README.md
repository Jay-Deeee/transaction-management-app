# 📊 Transaction Management Application

This is a simple full-stack application to manage and track transactions.
It uses Ruby on Rails-API for backend and React.js(Vive) for frontend.
Transactions are stored in a `.csv` file.

### 🛠 Features
- View all transactions in a table
- Add new transactions using a modal form
- Validates form input (format, completeness)
- Inline error messages and visual feedback
- CSV-based storage (no database required)

### ⚙️ Requirements
- Ruby (version 3.x or higher recommended)
- Rails (7.x)
- Node.js (v18+ recommended)
- npm (comes with Node)

## 🚀 Getting Started
1. Clone the Repository
```
git clone https://github.com/Jay-Deeee/transaction-management-app.git
cd transaction-management-app
```

2. Set Up the Rails API
```
cd backend-api
```
Install Ruby Gems
```
bundle install
```
Start the Rails Server
```
rails s
```
This will run the backend at `http://localhost:3000`
> Make sure a file named `transactions.csv` exists in the root of your project or in the location specified in your `TransactionCsvService` (`../transactions.csv` relative to `app/services`). You can create it manually with headers:
> ```
> Transaction Date,Account Number,Account Holder Name,Amount,Status
> ```

3. Set Up the React Frontend
```
cd ../frontend
```
Install Node Dependencies
```
npm install
```
Start the React Development Server
```
npm start
```
This will launch the frontend at `http://localhost:5173` (or similar)

### Now you can ctrl+click the path on your console to open it on your browser, or just enter it manually! Enjoy!
