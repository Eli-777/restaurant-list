const express = require('express')
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant.js')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then( restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter((restaurant) => {
//     return restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
//   })
//   res.render("index", { restaurants: restaurants, keyword: keyword })
// })

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})