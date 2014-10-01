class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :title
      t.string :image
      t.belongs_to :maze, index: true

      t.timestamps
    end
  end
end
