class FixLayoutColumnName < ActiveRecord::Migration
  def change
    rename_column :layouts, :layout, :layoutstring
  end
end
