class ArtistsDestroyShortName < ActiveRecord::Migration[5.1]
  def change
    remove_column :artists, :short_name
  end
end
