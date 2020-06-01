json.extract! transaction, :id, :from, :to, :date, :value, :block_id, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)
