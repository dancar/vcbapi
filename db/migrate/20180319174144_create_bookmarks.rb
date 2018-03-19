class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.string :path
      t.references :site, foreign_key: true
      t.string :title
      t.string :shortening

      t.timestamps
    end
  end
end
