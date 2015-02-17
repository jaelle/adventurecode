class AddAttachmentImageToSettings < ActiveRecord::Migration
  def self.up
    change_table :settings do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :settings, :image
  end
end
