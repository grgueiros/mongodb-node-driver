const router = require('express').Router()
const connection = require('../db/connection')
const { ObjectId } = require('mongodb')


router.get('/', (req, res) => {
  res.render('notas/create')
})

router.post('/', (req, res) => {
  const note = req.body;

  try {
    const createdNote = connection.getDb()
      .db()
      .collection('notes')
      .insertOne(note)

    res.redirect(301, '/')
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/edit/:id', async (req, res) => {
  const dataToUpdate = req.body;
  const _id = ObjectId(req.params.id)

  try {
    const note = await connection.getDb().db().collection('notes').findOne({ _id }, { dataToUpdate })
    res.render('notas/edit', { note })
  } catch (err) {
    res.status(500).json(err.message)
  }
})

router.get('/:id', async (req, res) => {
  const _id = ObjectId(req.params.id)

  try {
    const note = await connection.getDb().db().collection('notes').findOne({ _id })
    res.render('notas/details', { note })
  } catch (err) {
    res.status(500).json(err.message)
  }


})

router.post('/update', async (req, res) => {
  const { id } = req.body
  const dataToUpdate = req.body;

  try {
    await connection.getDb().db().collection('notes').updateOne({ _id: ObjectId(id) }, { '$set': dataToUpdate })
    res.redirect(301, '/')
  } catch (err) {
    res.status(500).json(err.message)
  }

})


router.post('/delete', async (req, res) => {
  const _id = ObjectId(req.body.id)

  try {
    await connection.getDb().db().collection('notes').deleteOne({ _id })
    res.redirect(301, '/')
  } catch (err) {
    res.status(500).json(err.message)
  }

})



module.exports = router