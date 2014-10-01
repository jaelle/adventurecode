class CreateMainCharacters < ActiveRecord::Migration
  def change
    create_table :main_characters do |t|
      t.string :title
      t.string :image
      t.belongs_to :maze, index: true

      t.timestamps
    end
  end
end
