class CreateMazemaps < ActiveRecord::Migration
  def change
    create_table :mazemaps do |t|
      t.references :maze, index:true
      t.references :layout, index: true

      t.timestamps
    end
  end
end
