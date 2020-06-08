module Transactions
	class TransactionSerializer < ActiveModel::Serializer
		attributes :transaction_id, :from, :to, :value, :block_id, :date

		def transaction_id
			object.id
		end
		
	end
end