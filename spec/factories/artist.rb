FactoryBot.define do
  factory :artist do
    full_name FFaker::Name.name
    image_cloud 'http://res.cloudinary.com/ddi25hb2u/image/upload/v1460410537/Alina%20Lyubko/luPnorb9VBs.jpg'
  end
end
