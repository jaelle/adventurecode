class SiteController < ApplicationController

	def index
		if session[:user_id]
			@account = Account.find(session[:user_id])
		end 
	end

end
