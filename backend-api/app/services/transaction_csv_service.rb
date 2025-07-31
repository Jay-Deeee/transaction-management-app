require 'csv'

class TransactionCsvService
  FILE_PATH = Rails.root.join("..", "transactions.csv")
  HEADERS = ["Transaction Date", "Account Number", "Account Holder Name", "Amount", "Status"]

  def self.all
    return [] unless File.exist?(FILE_PATH)

    CSV.read(FILE_PATH, headers: true).map do |row|
      camelize_keys(row.to_h)
    end
  end

  def self.add(transaction_data)
    CSV.open(FILE_PATH, "a", write_headers: false) do |csv|
      csv << HEADERS.map { |h| transaction_data[h] }
    end
  end

  def self.camelize_keys(row)
    row.transform_keys do |key|
      key.strip
         .downcase
         .gsub(/\s+/, '_')
         .gsub(/_(\w)/) { $1.upcase }
    end
  end
end
