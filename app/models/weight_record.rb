class WeightRecord < ApplicationRecord
  belongs_to :pet

  # Validations
  validates :weight, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :date, presence: true
end
