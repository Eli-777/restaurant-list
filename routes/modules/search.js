const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const order = req.query.order
  const target = req.query.target
  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .sort({ [target]: order })
    .then(restaurants => {
      if (restaurants.length === 0 ) {
        const nothing = true
        res.render('index', { restaurants, keyword, nothing })
      } else{
        res.render('index', { restaurants, keyword })
      }
    })
    .catch(error => console.log(error, 123213))
})

module.exports = router