const express = require('express')
const app = express()


// route setting
app.get('/', (req, res) => {
  res.send(`This is restaurant-list-CRUD project!`)
})


// setting port
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})
  