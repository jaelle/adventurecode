class Account < ActiveRecord::Base
	validates :username, presence: true
	validates :password, confirmation: true
	validates :password_confirmation, presence: true

	belongs_to :site
end
