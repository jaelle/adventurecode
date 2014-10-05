class AddLayoutIdToMaze < ActiveRecord::Migration
  def change
    add_reference :mazes, :layout, index: true
  end
end
