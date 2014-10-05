json.array!(@mazemaps) do |mazemap|
  json.extract! mazemap, :id, :maze, :layout_id
  json.url mazemap_url(mazemap, format: :json)
end
