json.array!(@layouts) do |layout|
  json.extract! layout, :id, :layout
  json.url layout_url(layout, format: :json)
end
