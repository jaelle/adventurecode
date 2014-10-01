class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.has_one :account
      t.has_one :maze
      t.string :unique_link

      t.timestamps
    end
  end
end
