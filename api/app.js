const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('../db/connection')

const noteRouter = require('../routes/notes')

const app = express()

// Configuração das views
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))



app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.get('/', async (req, res) => {

  try {
    const notes = await db.getDb().db().collection('notes').find({}).toArray();

    res.render('home', { notes })
  } catch (err) {
    res.json(err.message)
  }

})

app.use('/notes', noteRouter)

db.initDb((err, db) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('O banco conectou com sucesso')
  app.listen(8000, () => console.log('O app está funcionando'))
})
