class Artist < ActiveRecord::Base
  validates :image_cloud, uniqueness: true
end
