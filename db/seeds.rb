# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create home project
HomeProject.create(photo_type_id: 1, title: 'Everything has beauty',photo_type: 'Portret',
short_photo_type: 'portret', date: '23 JUN - 23 APR 2016',
image_cloud:'http://res.cloudinary.com/ddi25hb2u/image/upload/v1461181760/OlgaGlaskina/home/SfVJNC7qDIA.jpg',
image_cloud_thumb: 'http://res.cloudinary.com/ddi25hb2u/image/upload/c_fill,h_90,w_90/v1461181760/OlgaGlaskina/home/SfVJNC7qDIA.jpg')
HomeProject.create(photo_type_id: 2, title: 'IN THE BLINK OF AN EYE',photo_type: 'LOVE STORY',
short_photo_type: 'love_story', date: '8 JUN - 9 AUG 2016',
image_cloud:'http://res.cloudinary.com/ddi25hb2u/image/upload/v1461182187/OlgaGlaskina/home/YmoCz7D8uH0.jpg',
image_cloud_thumb: 'http://res.cloudinary.com/ddi25hb2u/image/upload/c_fill,g_south_west,h_90,w_90/v1461182187/OlgaGlaskina/home/YmoCz7D8uH0.jpg')
HomeProject.create(photo_type_id: 3, title: 'Ability is nothing',photo_type: 'EXCLUSIVE',
short_photo_type: 'exclusive', date: '12 MAY - 15 JUL 2016',
image_cloud:'http://res.cloudinary.com/ddi25hb2u/image/upload/v1461181575/OlgaGlaskina/home/LPuQ492q7pY.jpg',
image_cloud_thumb: 'http://res.cloudinary.com/ddi25hb2u/image/upload/c_fill,h_90,w_90/v1461181575/OlgaGlaskina/home/LPuQ492q7pY.jpg')


# create projects - Portret
Project.create(artwork_id: 101, global_name: 'portret',photo_name: 'Alina Lubko',
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460225053/Alina%20Lyubko/plhu5_Lt8zc.jpg")
Project.create(artwork_id: 102, global_name: 'portret',photo_name: 'Alina Karet',
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460374322/T2BBo3ujOH8_zae0jm.jpg")
Project.create(artwork_id: 103, global_name: 'portret',photo_name: 'Kristina Fink',
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460374361/YeQENDGbrLo_hom7uk.jpg")
Project.create(artwork_id: 104, global_name: 'portret',photo_name: 'Marina Abramova',
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460374402/AiDPJFo3AB4_dlq0bq.jpg")
Project.create(artwork_id: 105, global_name: 'portret',photo_name: 'Ketrin Strike',
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460374440/gl-5UhFmhV0_i6igrz.jpg")

# create projects - Exclusive
Project.create(artwork_id: 201, global_name: 'exclusive',photo_name: Faker::Name.name,
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460222192/Alina%20Lyubko/h9gqlv_In-E.jpg")
Project.create(artwork_id: 202, global_name: 'exclusive',photo_name: Faker::Name.name,
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460377635/Alina%20Lyubko/DM58SAE7lOA.jpg")
Project.create(artwork_id: 203, global_name: 'exclusive',photo_name: Faker::Name.name,
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460377609/Alina%20Lyubko/sJuW1jHdgVY.jpg")
Project.create(artwork_id: 204, global_name: 'exclusive',photo_name: Faker::Name.name,
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460223112/Alina%20Lyubko/CzrCpGavpss.jpg")
Project.create(artwork_id: 205, global_name: 'exclusive',photo_name: Faker::Name.name,
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460377666/Alina%20Lyubko/PAU47o_iq9Y.jpg")

# create projects - Love story
Project.create(artwork_id: 301, global_name: 'love_story',photo_name: "#{Faker::Name.name} and #{Faker::Name.name}",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460223697/Alina%20Lyubko/IsGJk3ehxl8.jpg")
Project.create(artwork_id: 302, global_name: 'love_story',photo_name: "#{Faker::Name.name} and #{Faker::Name.name}",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460378909/Alina%20Lyubko/QevowddQQ_Q.jpg")
Project.create(artwork_id: 303, global_name: 'love_story',photo_name: "#{Faker::Name.name} and #{Faker::Name.name}",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460379067/Alina%20Lyubko/pnfaMtjLncU.jpg")
Project.create(artwork_id: 304, global_name: 'love_story',photo_name: "#{Faker::Name.name} and #{Faker::Name.name}",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460379167/Alina%20Lyubko/EJ7oWqdt92M.jpg")
Project.create(artwork_id: 305, global_name: 'love_story',photo_name: "#{Faker::Name.name} and #{Faker::Name.name}",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460379201/Alina%20Lyubko/pM1HnVnnJdM.jpg")

# create artist main page
Artist.create(full_name: 'Alice Chernavskii',
 image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460410537/Alina%20Lyubko/luPnorb9VBs.jpg")
Artist.create(full_name: 'Glafira Glafirovka',
 image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460410687/Alina%20Lyubko/-mpx8ME7J7s.jpg")
Artist.create(full_name: 'Dan Sirotkin',
 image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460410768/Alina%20Lyubko/7K9CxD4h9ZA.jpg")
Artist.create(full_name: 'Hanna Khodas',
 image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460410870/Alina%20Lyubko/05RGoapGJfg.jpg")
Artist.create(full_name: 'Christina Bartos',
 image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460377635/Alina%20Lyubko/DM58SAE7lOA.jpg")
Artist.create(full_name: 'Vika Titovets',
 image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460416597/Alina%20Lyubko/titovets/0TdzvZMSOMY.jpg")

# create artist for every
# 1
Project.create(artwork_id: 301, global_name: 'bartos',photo_name: "Christina Bartos",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460417185/Alina%20Lyubko/bartos/sJuW1jHdgVY.jpg")
Project.create(artwork_id: 302, global_name: 'bartos',photo_name: "Christina Bartos",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460417185/Alina%20Lyubko/bartos/iw14mNZ6HoY.jpg")
Project.create(artwork_id: 303, global_name: 'bartos',photo_name: "Christina Bartos",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460417185/Alina%20Lyubko/bartos/q8BUM37uFeo.jpg")
Project.create(artwork_id: 304, global_name: 'bartos',photo_name: "Christina Bartos",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460417185/Alina%20Lyubko/bartos/Sl4qEJlq_UE.jpg")
Project.create(artwork_id: 305, global_name: 'bartos',photo_name: "Christina Bartos",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460417185/Alina%20Lyubko/bartos/t6ghXWw6CoU.jpg")

# create artist for every
# 2 Alice Chernavskii
Project.create(artwork_id: 301, global_name: 'chernavskii',photo_name: "Alice Chernavskii",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468131/Alina%20Lyubko/chernivski/1YTrMxc17No.jpg")
Project.create(artwork_id: 302, global_name: 'chernavskii',photo_name: "Alice Chernavskii",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468168/Alina%20Lyubko/chernivski/luPnorb9VBs.jpg")
Project.create(artwork_id: 303, global_name: 'chernavskii',photo_name: "Alice Chernavskii",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468138/Alina%20Lyubko/chernivski/pZqeq6ee2iM.jpg")
Project.create(artwork_id: 304, global_name: 'chernavskii',photo_name: "Alice Chernavskii",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468121/Alina%20Lyubko/chernivski/qpScTyI1oTE.jpg")
Project.create(artwork_id: 305, global_name: 'chernavskii',photo_name: "Alice Chernavskii",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468174/Alina%20Lyubko/chernivski/rZHuDYZfFDY.jpg")
Project.create(artwork_id: 306, global_name: 'chernavskii',photo_name: "Alice Chernavskii",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468149/Alina%20Lyubko/chernivski/TPz4P5-r1II.jpg")

# create artist for every
# 3 Glafira Glafirovka
Project.create(artwork_id: 301, global_name: 'glafirovka',photo_name: "Glafira Glafirovka",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468064/Alina%20Lyubko/glafirovna/-mpx8ME7J7s.jpg")
Project.create(artwork_id: 302, global_name: 'glafirovka',photo_name: "Glafira Glafirovka",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468055/Alina%20Lyubko/glafirovna/XN5wPlMjdl0.jpg")

# create artist for every
# 3 Dan Sirotkin
Project.create(artwork_id: 301, global_name: 'sirotkin',photo_name: "Dan Sirotkin",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468252/Alina%20Lyubko/sirotkina/7K9CxD4h9ZA.jpg")
Project.create(artwork_id: 302, global_name: 'sirotkin',photo_name: "Dan Sirotkin",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468230/Alina%20Lyubko/sirotkina/by7h98cRjqs.jpg")
Project.create(artwork_id: 303, global_name: 'sirotkin',photo_name: "Dan Sirotkin",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468238/Alina%20Lyubko/sirotkina/pGq1EomYcFY.jpg")
Project.create(artwork_id: 304, global_name: 'sirotkin',photo_name: "Dan Sirotkin",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468260/Alina%20Lyubko/sirotkina/Syx7K0TPtaY.jpg")
Project.create(artwork_id: 305, global_name: 'sirotkin',photo_name: "Dan Sirotkin",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468245/Alina%20Lyubko/sirotkina/uOLryaLOhBQ.jpg")

# create artist for every
# 4 Hanna Khodas
Project.create(artwork_id: 301, global_name: 'khodas',photo_name: "Hanna Khodas",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468319/Alina%20Lyubko/khodas/05RGoapGJfg.jpg")
Project.create(artwork_id: 302, global_name: 'khodas',photo_name: "Hanna Khodas",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468331/Alina%20Lyubko/khodas/5jdlS4a0xTE.jpg")
Project.create(artwork_id: 303, global_name: 'khodas',photo_name: "Hanna Khodas",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468297/Alina%20Lyubko/khodas/CayFLHCVNUE.jpg")
Project.create(artwork_id: 304, global_name: 'khodas',photo_name: "Hanna Khodas",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468309/Alina%20Lyubko/khodas/p4tcjW2yQsY.jpg")
Project.create(artwork_id: 305, global_name: 'khodas',photo_name: "Hanna Khodas",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460468339/Alina%20Lyubko/khodas/XckutVdHO0M.jpg")

# create artist for every
# 5 Vika Titovets
Project.create(artwork_id: 301, global_name: 'titovets',photo_name: "Vika Titovets",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460416597/Alina%20Lyubko/titovets/0TdzvZMSOMY.jpg")
Project.create(artwork_id: 302, global_name: 'titovets',photo_name: "Vika Titovets",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460416651/Alina%20Lyubko/titovets/H3QbuCTN2aI.jpg")
Project.create(artwork_id: 303, global_name: 'titovets',photo_name: "Vika Titovets",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460416690/Alina%20Lyubko/titovets/q3KwsYwcu8o.jpg")
Project.create(artwork_id: 304, global_name: 'titovets',photo_name: "Vika Titovets",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460416665/Alina%20Lyubko/titovets/qIQ12RG4t6g.jpg")
Project.create(artwork_id: 305, global_name: 'titovets',photo_name: "Vika Titovets",
image_cloud: "http://res.cloudinary.com/ddi25hb2u/image/upload/v1460416639/Alina%20Lyubko/titovets/sb7Xx-1uni4.jpg")
