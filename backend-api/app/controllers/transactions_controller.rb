class TransactionsController < ApplicationController
  wrap_parameters false

  def index
    transactions = TransactionCsvService.all
    render json: transactions
  end

  def create
    status = ["Pending", "Settled", "Failed"].sample

    transaction = {
      "Transaction Date" => transaction_params[:transaction_date],
      "Account Number" => transaction_params[:account_number],
      "Account Holder Name" => transaction_params[:account_holder_name],
      "Amount" => transaction_params[:amount],
      "Status" => status
    }

    TransactionCsvService.add(transaction)

    render json: transaction, status: :created
  end

  private

  def transaction_params
    params.permit(:transaction_date, :account_number, :account_holder_name, :amount)
  end
end
