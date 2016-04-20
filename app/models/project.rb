class Project < ActiveRecord::Base
  validates :image_cloud, uniqueness: true
end
