class TransactionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "transaction_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
