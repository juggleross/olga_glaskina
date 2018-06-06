FactoryBot.define do
  factory :home_project do
    photo_type_id 1
    title Faker::OnePiece.island
    photo_type 'Portret'
    short_photo_type 'portret'
    date '23 JUN - 23 APR 2016'
    image_cloud 'http://res.cloudinary.com/ddi25hb2u/image/upload/v1461181760/OlgaGlaskina/home/SfVJNC7qDIA.jpg'
    image_cloud_thumb 'http://res.cloudinary.com/ddi25hb2u/image/upload/c_fill,h_90,w_90/v1461181760/OlgaGlaskina/home/SfVJNC7qDIA.jpg'
  end
end
