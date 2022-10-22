export default {
  checkEmail: function(v) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v)
  },
  checkName: function(v) {
    return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(v)
  },
  checkPswd: function(v) {
    return /^[A-Za-z0-9]{6,16}$/.test(v)
  }
}