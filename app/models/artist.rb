class Artist < ApplicationRecord
  belongs_to :meta_tag

  validates :image_cloud, uniqueness: true
end
