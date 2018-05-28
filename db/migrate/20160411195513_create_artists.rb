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
