class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :set_user_id, :set_title, :set_blockly_template

  def set_title
  	@title = "The title"
  end

  def set_blockly_template
    
  end

	private
	
		def account_params
			params.require(:account).permit(:username,
				:password,:password_confirmation,:email,:birthday)
		end

		def set_user_id
			if (session[:user_id])
				@logged_in_account = Account.find(session[:user_id])
			end
		end
end
