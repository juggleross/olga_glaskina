class CreateArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :artists do |t|
      t.string :full_name
      t.string :short_name
      t.string :image_cloud

      t.timestamps null: false
    end
  end
end

# temllate for case in ARTIST
# rails g casein:scaffold Artist full_name:string short_name:string image_cloud:string
