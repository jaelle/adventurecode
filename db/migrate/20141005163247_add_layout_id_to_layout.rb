class AddLayoutIdToLayout < ActiveRecord::Migration
  def change
    add_column :layouts, :layout_id, :integer
    add_index :layouts, :layout_id
  end
end
