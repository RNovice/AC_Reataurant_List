const express = require('express')
const exhbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exhbs.engine({ defaultLayout : 'main' }))
app.set ('view engine', 'handlebars')

app.use(express.static('public'))

//根目錄
app.get('/', (req, res) => {
  res.render('index', { restaurants : restaurantList.results })
})

//各餐廳詳細資料
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find( rtr => rtr.id === Number(req.params.restaurant_id))
  res.render('show',{ restaurant })
})

//搜尋功能
app.get('/search', (req, res)  => {
  //將與關鍵字相符的資料放入keyword中
  const keyword = [
    ...(restaurantList.results.filter( 
        rtr => rtr.name.toLowerCase().includes(req.query.keyword.toLowerCase()))),
    ...(restaurantList.results.filter( 
        rtr => rtr.name_en.toLocaleLowerCase().includes(req.query.keyword.toLowerCase()))),
    ...(restaurantList.results.filter( 
        rtr => rtr.category.includes(req.query.keyword)))
  ]
  //移除重複的資料
  const filteredSearchResults = keyword.filter((item,index,arr)=>{
      return arr.indexOf(item) === index
  })

  res.render('index', { restaurants : filteredSearchResults, keyword : req.query.keyword })
})

app.listen(port, () =>{
  console.log(`Express is listening on http://localhost:${port}`)
})
