class Question < ApplicationRecord
  belongs_to :user
  has_many :answers, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true

  mount_uploaders :images, ImageUploader
  serialize :images, JSON

  scope :published, -> { where(draft: false) }
  scope :drafts, -> { where(draft: true) }

  attr_accessor :remove_images

  before_save :remove_selected_images

  private

  def remove_selected_images
    return if remove_images.blank?
    self.images = images.reject.with_index { |_, i| remove_images.include?(i.to_s) }
  end
end
