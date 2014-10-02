class AddAttachmentImageToMainCharacters < ActiveRecord::Migration
  def self.up
    change_table :main_characters do |t|
      # t.attachment :image
    end
  end

  def self.down
    remove_attachment :main_characters, :image
  end
end
