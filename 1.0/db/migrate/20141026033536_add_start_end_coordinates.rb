class AddStartEndCoordinates < ActiveRecord::Migration
  def change
  	add_column :mazes, :startCoordinates, :string
  	add_column :mazes, :endCoordinates, :string
  end
end
