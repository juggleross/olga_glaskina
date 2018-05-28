class CreateHomeProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :home_projects do |t|
      t.string :title
      t.string :photo_type
      t.string :short_photo_type
      t.string :date
      t.string :image_cloud
      t.string :image_cloud_thumb
      t.integer :photo_type_id

      t.timestamps null: false
    end
  end
end
# rails generate template for case in HomeProject
# rails g casein:scaffold HomeProject photo_type_id:integer title:string
# photo_type:string short_photo_type:string date:string image_cloud:string image_cloud_thumb:string
