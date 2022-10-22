module.exports = pic = require('express').Router()

var mdbctl
var modules
var dataModel

pic.use((req, res, next) => {
  mdbctl = req.app.locals.mdbctl
  modules = global.modules
  dataModel = req.app.locals.dataModel
  next()
})
  // upload picture
  .post('/upload', (req, res) => {

  })
  // get picture
  .get('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(req.params.id)
  })