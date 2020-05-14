const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
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

