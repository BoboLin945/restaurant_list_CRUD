const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const app = express()

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


// mongoose connect to mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// connecting error
db.on('error', () => {
  console.log('mongodb error!')
})
// connecting success
db.once('open', () => {
  console.log('mongodb connected!')
})

// route setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// Create
app.post('/restaurants', (req, res) => {
  // console.log(req.body)
  const addItem = req.body
  return Restaurant.create({
    name: addItem.name,
    category: addItem.category,
    image: addItem.image,
    location: addItem.location,
    phone: addItem.phone,
    google_map: addItem.google_map,
    rating: addItem.rating,
    description: addItem.description,
  })
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

// Read
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// Update (Edit)
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editItem = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      console.log(restaurant.name)
      console.log(editItem.name)
      restaurant.name = editItem.name,
      restaurant.category = editItem.category,
      restaurant.image = editItem.image,
      restaurant.location = editItem.location,
      restaurant.phone = editItem.phone,
      restaurant.google_map = editItem.google_map,
      restaurant.rating = editItem.rating,
      restaurant.description = editItem.description,
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


// setting port
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})

