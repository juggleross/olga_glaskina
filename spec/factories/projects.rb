FactoryBot.define do
  factory :project do
    artwork_id 301
    global_name 'love_story'
    photo_name "#{Faker::Name.name} and #{Faker::Name.name}"
    image_cloud "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460223697/Alina%20Lyubko/IsGJk3ehxl8.jpg"    
  end
end
