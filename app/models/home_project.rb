class HomeProject < ApplicationRecord
  validates :short_photo_type, uniqueness: true
end
