class AddBelongsToAssociationToArtist < ActiveRecord::Migration[5.1]
  def change
    add_reference :artists, :meta_tag, index: true
  end
end
