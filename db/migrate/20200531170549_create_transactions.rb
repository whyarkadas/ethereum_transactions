class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :from
      t.string :to
      t.date :date
      t.float :value
      t.integer :block_id

      t.timestamps
    end
  end
end
