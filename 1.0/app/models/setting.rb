class Setting < ActiveRecord::Base
	has_attached_file :image, :styles => { :thumb => "50x50>"}, :default_url => "/images/:style/missing.png"
	validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

	def setting_params
		params.require(:setting).permit(:title, :image)
  	end
end
