class Event < ApplicationRecord
  belongs_to :pet
  has_many_attached :images

  mount_uploaders :images, ImageUploader

  EVENT_TYPES = %w[feeding excretion food_refusal regurgitation bathing shedding habitat_cleaning egg_laying mating].freeze

  def event_types
    EVENT_TYPES.select { |type| self[type] }
  end

  def event_types=(types)
    EVENT_TYPES.each do |type|
      self[type] = types.include?(type)
    end
  end
end
