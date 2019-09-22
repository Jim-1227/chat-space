json.array! @users do |user|
  if user != current_user
    json.id user.id
    json.name user.name
  end
end