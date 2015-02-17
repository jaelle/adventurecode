class CreateMainCharacters < ActiveRecord::Migration
  def change
    create_table :main_characters do |t|
      t.string :title
      t.string :image

      t.timestamps
    end
  end
end
