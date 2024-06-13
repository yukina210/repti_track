class CreatePets < ActiveRecord::Migration[7.1]
  def change
    create_table :pets do |t|
      t.string :pet_name
      t.integer :gender
      t.date :birthday
      t.string :pet_avatar
      t.integer :category
      t.string :breed
      t.string :food
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
