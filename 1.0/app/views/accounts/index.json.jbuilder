json.array!(@accounts) do |account|
  json.extract! account, :id, :username, :password, :birthday, :email
  json.url account_url(account, format: :json)
end
