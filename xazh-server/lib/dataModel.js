const modules = global.modules

module.exports = {
  /**
   * user collection
   * @param {user info} info 
   * @returns 
   */
  user: function (info) {
    if (typeof info != 'object'
      || !modules.checkName(info.name)
      || !modules.checkEmail(info.email)
      || !modules.checkPswd(info.pswd)
      || !info.signIP)
      return false

    return {
      name: info.name,
      email: info.email,
      pswd: info.pswd,
      signIP: info.signIP,
      signDay: new Date().getTime(),
      icon: null,
      birthday: null,
      resume: '介绍下自己吧'
    }
  },
  userstate: function(req, user) {
    return {
      id: user._id,
      lastcall: new Date().getTime(),
      newlyip: req.ip,
      ticket: ''
    }
  },
  /**
   * picture info collection
   * @param {pic info} info 
   * @returns 
   */
  pici: function (info) {
    if (typeof info != 'object'
      || !info.md5
      || !info.suffix
      || !info.author) {
      return false
    }



    return {
      md5: info.md5,
      suffix: info.suffix,
      author: info.author,
      uploadtime: new Date().getTime(),
    }
  },
  /**
   * picture data collection
   * @param {pic data info} info 
   */
  picd: function (info) {

  }
}