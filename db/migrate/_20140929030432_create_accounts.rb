class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :username
      t.string :password
      t.date :birthday
      t.string :email

      t.timestamps
    end
  end
end
