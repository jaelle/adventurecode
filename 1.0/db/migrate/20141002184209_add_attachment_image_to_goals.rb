class AddAttachmentImageToGoals < ActiveRecord::Migration
  def self.up
    change_table :goals do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :goals, :image
  end
end
