class Maze < ActiveRecord::Base
  has_one :setting
  has_one :main_character
  has_one :goal

  has_one :layout
end
