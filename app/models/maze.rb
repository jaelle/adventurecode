class Maze < ActiveRecord::Base
  belongs_to :setting
  belongs_to :main_character
  belongs_to :goal
end
