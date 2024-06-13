class AddDraftToQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :questions, :draft, :boolean, default: false
  end
end
