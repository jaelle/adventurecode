class AccountsController < ApplicationController
	
	def new
		@account = Account.new
	end

	def edit  
		@account = Account.find(params[:id])
	end

	def update
		@account = Account.find(params[:id])

		if (@account).update(account_params)
			redirect_to @account
		else 
			render 'edit'
		end
	end

	def create

		@account = Account.new(account_params)
		if @account.save
			session[:user_id] = @account.id
			redirect_to @account;
		else
			render 'new'
		end

	end

	def destroy
		@account = Account.find(params[:id])
  		@account.destroy
 
  		redirect_to accounts_path
  	end

	def show
		@account = Account.find(session[:user_id])

	end

	def index
		@accounts = Account.all
		if (session[:user_id])
			@account = Account.find(session[:user_id])
		end
	end

	def login
		@account = Account.where(account_params).take!
		session[:user_id] = @account.id
		if(@account)
			redirect_to accounts_path
		end
	end

	def logout
		session[:user_id] = nil
		@account = nil

		redirect_to '/'
	end
end
