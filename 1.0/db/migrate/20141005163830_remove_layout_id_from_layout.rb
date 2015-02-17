class RemoveLayoutIdFromLayout < ActiveRecord::Migration
  def change
    remove_index :layouts, :layout_id
    remove_column :layouts, :layout_id, :integer
  end
end
