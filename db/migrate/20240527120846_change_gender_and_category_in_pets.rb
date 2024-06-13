class ChangeGenderAndCategoryInPets < ActiveRecord::Migration[6.0]
  def change
    change_column :pets, :gender, :integer, default: 0
    change_column :pets, :category, :integer, default: 0
  end
end