module.exports = function () {
  const config = {
    filename: './runing.log',
    clearschedule: '* * * * * 0'
  }

  const fs = require('fs')
  const autoclear = require('node-schedule').scheduleJob(config.clearschedule, () => {
    fs.writeFile(config.filename, Date().toString() + '    本周日志\n', m => {
      if (m) {
        console.log('[Mlog] 日志写入失败')
        return false
      }
    })
  })

  const formatLog = function (message, level = 3, filename = config.filename) {
    const date = new Date()
    const dateH = date.getHours()
    const dateM = date.getMinutes()
    const dateS = date.getSeconds()
    var formatStr = '[' + date.getMonth()
      + '.' + date.getDay()
      + ' ' + (dateH < 10 ? '0' + dateH : dateH)
      + ':' + (dateM < 10 ? '0' + dateM : dateM)
      + ':' + (dateS < 10 ? '0' + dateS : dateS)
      + ']'
    formatStr += '(' + level + ') '
    formatStr += message + '\n'
    fs.appendFile(filename, formatStr, m => {
      if (m) {
        console.log('[Mlog] 日志写入失败')
        return false
      }
    })
  }

  return {
    append: function (message) {
      formatLog(message)
    },
    appoint: function (message, filename) {
      if (!filename)
        console.log('[Mlog] 指定文件不能为空')
      formatLog(message, 3, filename)
    }
  }
}()