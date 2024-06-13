class AddFeedingToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :feeding, :boolean, default: false
  end
end
