class Pet < ApplicationRecord
  belongs_to :user
  has_many :weight_records, dependent: :destroy
  has_many :events, dependent: :destroy

  enum gender: { not_specified: 0, male: 1, female: 2 }
  enum category: { snake: 0, lizard: 1, gecko: 2, chameleon:3, turtle: 4, others: 5 }

  # Pet avatar uploader
  mount_uploader :pet_avatar, PetAvatarUploader

  # Validations
  validates :pet_name, presence: true, length: { maximum: 50 }
  validates :date_of_birth, presence: true
  validates :gender, presence: true, inclusion: { in: genders.keys }
  validates :category, presence: true, inclusion: { in: Pet.categories.keys }
  validates :breed, presence: true
end
