const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

app = express()

// understand JSON
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.post('/public/studentDataAdd.html', (req, res) => {
  var db_studID = req.body.f_studID  
  var db_firstName = req.body.f_firstName
  var db_lastName = req.body.f_lastName
  var db_gpa = req.body.f_gpa
  var db_age = req.body.f_age
  var db_height = req.body.f_height
  var db_weight = req.body.f_weight
  var db_hairColour = req.body.f_hairColour

  
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
