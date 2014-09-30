class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

	private
		def account_params
			params.require(:account).permit(:username,:password,:password_confirmation)
		end
end
