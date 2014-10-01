class CreateMazes < ActiveRecord::Migration
  def change
    create_table :mazes do |t|
      t.string :title
      t.string :layout
      t.string :start
      t.string :end
      t.has_one :setting
      t.has_one :main_character
      t.has_one :goal
      t.belongs_to :puzzle, index: true

      t.timestamps
    end
  end
end
