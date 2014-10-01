class Maze < ActiveRecord::Base
  belongs_to :puzzle
  has_one :goal
  has_one :setting
  has_one :main_character
end
