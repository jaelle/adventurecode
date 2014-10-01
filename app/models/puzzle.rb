class Puzzle < ActiveRecord::Base
	has_one :maze
	has_one :account
end
