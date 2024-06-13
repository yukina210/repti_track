class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.references :pet, null: false, foreign_key: true
      t.date :date
      t.boolean :feed, default: false
      t.boolean :excretion, default: false
      t.boolean :regurgitation, default: false
      t.boolean :bathing, default: false
      t.boolean :shedding, default: false
      t.boolean :egg_laying, default:false
      t.boolean :mating, default: false
      t.text :note
      t.json :images

      t.timestamps
    end
  end
end
