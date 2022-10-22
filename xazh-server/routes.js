module.exports = function (app) {
  // Apis related to user registration or login
  app.use('/user', require('./routes/user/signin'))

  // Apis related to picture for get and upload
  app.use('/pic', require('./routes/resource/picture'))
}