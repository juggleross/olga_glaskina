class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.integer :artwork_id
      t.string :global_name
      t.string :photo_name
      t.string :image_cloud

      t.timestamps null: false
    end
  end
end
