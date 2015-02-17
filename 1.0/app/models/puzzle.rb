class Puzzle < ActiveRecord::Base
  belongs_to :account
  belongs_to :maze
end
