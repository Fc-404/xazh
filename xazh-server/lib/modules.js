const MD5 = require('md5')

module.exports = {
  execPromises: function (...args) {
    const callback = args.pop()
    let promiseDone = 0
    let promiseParameters = new Array(args.length)
    for (const promise of args) {
      promise.then((v) => {
        promiseParameters[promiseDone++] = v
        if (promiseDone >= args.length) {
          callback(promiseParameters)
        }
      })
    }
  },
  md5: function (s) {
    return MD5(s)
  },
  checkEmail: function (v) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v)
  },
  checkName: function (v) {
    return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(v)
  },
  checkPswd: function (v) {
    return /^[A-Za-z0-9]{6,16}$/.test(v)
  }
}