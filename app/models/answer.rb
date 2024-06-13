class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question
  has_many :likes, dependent: :destroy

  validates :content, presence: true

  mount_uploader :image, ImageUploader
end
