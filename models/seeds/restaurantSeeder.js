const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.results.forEach(list => {
    Restaurant.create({
      "name": list.name,
      "name_en": list.name_en,
      "category": list.category,
      "image": list.image,
      "location": list.location,
      "phone": list.phone,
      "google_map": list.google_map,
      "rating": list.rating,
      "description": list.description
    })
  })
  console.log('done')
})

