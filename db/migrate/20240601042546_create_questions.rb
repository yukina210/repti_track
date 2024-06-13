class CreateQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :questions do |t|
      t.string :title
      t.text :content
      t.string :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
