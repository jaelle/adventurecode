json.array!(@mazes) do |maze|
  json.extract! maze, :id, :title, :layout, :start, :end, :setting_id, :main_character_id, :goal_id
  json.url maze_url(maze, format: :json)
end
