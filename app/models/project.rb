class Project < ApplicationRecord
  validates :image_cloud, uniqueness: true
end
