class AddDateOfBirthToPets < ActiveRecord::Migration[7.1]
  def change
    add_column :pets, :date_of_birth, :date
  end
end
