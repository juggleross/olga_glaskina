class CreateMetaTags < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_tags do |t|
      t.string :type
      t.text :title
      t.text :keywords
      t.text :descriptions

      t.timestamps
    end
  end
end
