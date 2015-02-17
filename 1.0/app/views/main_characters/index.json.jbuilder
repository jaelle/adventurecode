json.array!(@main_characters) do |main_character|
  json.extract! main_character, :id, :title, :image
  json.url main_character_url(main_character, format: :json)
end
