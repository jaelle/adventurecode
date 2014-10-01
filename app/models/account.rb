class Account < ActiveRecord::Base
	validates :username, :password, presence: true
	validates :username, :password, presence: true, on: [:login]
	validates :password_confirmation, presence:true, on: [:create, :update]
	validates :password, confirmation: true, on: [:create, :update]

	belongs_to :site
end
