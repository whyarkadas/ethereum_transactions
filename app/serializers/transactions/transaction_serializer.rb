module Transactions
	class TransactionSerializer < ActiveModel::Serializer
		attributes :from, :to, :value, :block_id, :date

		def transaction_id
			object.id
		end
		
	end
end