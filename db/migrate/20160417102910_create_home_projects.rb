class CreateHomeProjects < ActiveRecord::Migration
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
