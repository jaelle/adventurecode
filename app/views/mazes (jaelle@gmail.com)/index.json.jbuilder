json.array!(@mazes) do |maze|
  json.extract! maze, :id, :title, :layout, :start, :end, :setting, :main_character, :goal, :puzzle_id
  json.url maze_url(maze, format: :json)
end
