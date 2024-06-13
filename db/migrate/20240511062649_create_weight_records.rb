class CreateWeightRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :weight_records do |t|
      t.decimal :weight
      t.references :pet, null: false, foreign_key: true
      t.date :date

      t.timestamps
    end
  end
end
