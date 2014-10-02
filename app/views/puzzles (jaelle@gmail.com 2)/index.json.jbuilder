json.array!(@puzzles) do |puzzle|
  json.extract! puzzle, :id, :account_id, :maze_id, :unique_link
  json.url puzzle_url(puzzle, format: :json)
end
