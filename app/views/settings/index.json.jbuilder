json.array!(@settings) do |setting|
  json.extract! setting, :id, :title, :image, :maze_id
  json.url setting_url(setting, format: :json)
end
