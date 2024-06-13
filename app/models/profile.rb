class Profile < ApplicationRecord
    # Associations
    belongs_to :user

    # Gender selection
    enum gender: { not_specified: 0, male: 1, female: 2, other: 3 }

    # Avatar uploader
    mount_uploader :avatar, AvatarUploader

    # Validations
    validates :username, presence: true, length: { maximum: 50 }
    validates :date_of_birth, presence: true
    validates :gender, presence: true, inclusion: { in: genders.keys }
end
