class MainCharacter < ActiveRecord::Base
	has_attached_file :image, :styles => { :thumb => "50x50>" }, :default_url => "/images/:style/missing.png"
  	validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  	private 
  		def user_params
		  params.require(:user).permit(:avatar)
		end
end
