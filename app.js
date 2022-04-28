const express = require('express')
const exhbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exhbs.engine({ defaultLayout : 'main' }))
app.set ('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { restaurants : restaurantList.results })
})

app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})
