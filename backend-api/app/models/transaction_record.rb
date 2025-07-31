class TransactionRecord
  include ActiveModel::Model

  attr_accessor :transaction_date, :account_number, :account_holder_name, :amount

  validates :transaction_date, :account_number, :account_holder_name, :amount, presence: true
  validates :amount, numericality: true
  validates :account_holder_name, format: { with: /\A[a-zA-Z\s]+\z/, message: "only allows letters" }
  validates :account_number, format: { with: /\A\d{4}-\d{4}-\d{4}\z/, message: "must be in the format XXXX-XXXX-XXXX" }
  validate :transaction_date_is_valid_date

  def transaction_date_is_valid_date
    Date.parse(transaction_date)
  rescue ArgumentError
    errors.add(:transaction_date, "must be a valid date")
  end
end
