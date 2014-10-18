class StaticController < ApplicationController
	def blockly
		render layout: "blockly"
	end

	def blocklymaze
		render layout: "blockly"
	end
end
