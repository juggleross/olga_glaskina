class Artist < ApplicationRecord
  validates :image_cloud, uniqueness: true
end
