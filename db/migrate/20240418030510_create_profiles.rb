class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :username
      t.date :date_of_birth
      t.integer :gender

      t.timestamps
    end
  end
end
