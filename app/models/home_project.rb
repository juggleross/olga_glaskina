class HomeProject < ActiveRecord::Base
  validates :short_photo_type, uniqueness: true
end
