class CreateLayouts < ActiveRecord::Migration
  def change
    create_table :layouts do |t|
      t.string :layout

      t.timestamps
    end
  end
end
