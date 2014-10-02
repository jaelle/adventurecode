class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.references :account, index: true
      t.references :maze, index: true
      t.string :unique_link

      t.timestamps
    end
  end
end
