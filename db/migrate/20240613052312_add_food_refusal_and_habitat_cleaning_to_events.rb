class AddFoodRefusalAndHabitatCleaningToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :food_refusal, :boolean, default: false
    add_column :events, :habitat_cleaning, :boolean, default: false
  end
end
