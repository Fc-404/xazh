module.exports = signin = require('express').Router()

var mdbctl
var modules
var dataModel

signin.use((req, res, next) => {
  mdbctl = req.app.locals.mdbctl
  modules = global.modules
  dataModel = req.app.locals.dataModel
  next()
})
  /**
   * POST signup
   * Needed {
   *  name, email, pswd
   * }
   */
  .post('/signup', async (req, res) => {
    let userInfo = dataModel.user({
      name: req.body.name,
      email: req.body.email,
      pswd: req.body.pswd,
      signIP: req.ip
    })
    if (!userInfo) {
      res.status(400).json({ error: 'Non standard format of submit info' })
      return
    }

    // Check whether the user name and email are duplicate, then insert
    modules.execPromises(
      mdbctl.findUserByName(req.body.name),
      mdbctl.findUserByEmail(req.body.email),
      (v) => {
        if (v[0] || v[1]) {
          res.status(400).json({ error: 'Exist User' })
          return
        }
        mdbctl.insertUser(userInfo).then((result) => {
          res.json(result)
        })
      }
    )
  })
  /**
   * POST signin
   * Needed {
   *  email | name, pswd
   * }
   */
  .post('/signin', async (req, res) => {
    let account = req.body.email ? req.body.email : req.body.name
    let result = await mdbctl.checkUserPswd(account, req.body.pswd)
    if (result) {
      await mdbctl.updateIP(account, req.ip)
    }
    res.json({ 'result': result })
  })

