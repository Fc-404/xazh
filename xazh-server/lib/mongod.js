module.exports = function () {
  const config = {
    name: 'xazhdba',
    pswd: 'xazh',
    host: '192.168.22.22',
    port: '27017',
    db: 'xazh'
  }

  const formatUrl = function () {
    return 'mongodb://'
      + config.name
      + ':' + config.pswd
      + '@' + config.host
      + ':' + config.port
      + '/?authMechanism=DEFAULT&authSource='
      + config.db
  }()

  const mongod = require('mongodb')
  var client = new mongod.MongoClient(formatUrl)

  return {
    exec: async function (callback = async () => { }) {
      try {
        await client.connect()
        await callback(client.db(config.db))
      } catch (err) {
        global.log.append('数据库操作失败\n' + err)
        return false
      } finally {
        // client.close()
      }
    }
  }
}()