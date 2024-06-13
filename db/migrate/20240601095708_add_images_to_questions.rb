class AddImagesToQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :questions, :images, :string
  end
end
