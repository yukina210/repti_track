class ChangePrecisionAndScaleForWeightInWeightRecords < ActiveRecord::Migration[7.1]
  def change
    change_column :weight_records, :weight, :decimal, precision: 5, scale: 2
  end
end
