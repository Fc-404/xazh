const modules = require('./modules')

module.exports = (dbo) => {
  return {
    /**
     * find user by name
     * @param {name} name 
     * @returns 
     */
    findUserByName: async function (name) {
      let data = null
      await dbo.exec(async (db) => {
        let users = db.collection('users')
        data = await users.findOne({ 'name': name })
      })
      return data
    },
    /**
     * find user by email
     * @param {email} email 
     * @returns 
     */
    findUserByEmail: async function (email) {
      let data = null
      await dbo.exec(async (db) => {
        let users = db.collection('users')
        data = await users.findOne({ 'email': email })
      })
      return data
    },
    /**
     * inser one user
     * @param {userinfo} document 
     * @returns 
     */
    insertUser: async function (document) {
      let result
      await dbo.exec(async (db) => {
        let users = db.collection('users')
        result = await users.insertOne(document)
      })
      return result
    },
    /**
     * check user password
     * @param {name or email} account 
     * @param {md5 of password} pswd_md5 
     * @returns 
     */
    checkUserPswd: async function (account, pswd_md5) {
      let result
      await dbo.exec(async (db) => {
        let users = db.collection('users')
        result = await users.findOne({ 'name': account }, { 'pswd': 1 })
        if (!result)
          result = await users.findOne({ 'email': account }, { 'pswd': 1 })
      })
      return !result
        || modules.md5(result.pswd) != pswd_md5
        ? false : true
    },
    /**
     * update the recently signin ip of the user,
     * and update ticket for user
     * @param {name of email} account 
     * @param {signin ip} ip 
     */
    updateIP: async function (account, ip) {
      let result
      await dbo.exec(async (db) => {
        let users = db.collection('users')
        result = await users.updateOne({ name: account }, { nowip: ip })
        console.log(result)
      })
      return result
    }
  }
}