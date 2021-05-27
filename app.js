const express = require('express')
const mongoose = require('mongoose')

const app = express()

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
  res.send(`This is restaurant-list-CRUD project!`)
})


// setting port
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})
