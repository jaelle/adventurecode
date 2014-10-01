json.array!(@puzzles) do |puzzle|
  json.extract! puzzle, :id, :account, :maze, :unique_link
  json.url puzzle_url(puzzle, format: :json)
end
