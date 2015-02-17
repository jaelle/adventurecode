class CreateMazes < ActiveRecord::Migration
  def change
    create_table :mazes do |t|
      t.string :title
      t.string :layout
      t.string :start
      t.string :end
      t.references :setting, index: true
      t.references :main_character, index: true
      t.references :goal, index: true

      t.timestamps
    end
  end
end
