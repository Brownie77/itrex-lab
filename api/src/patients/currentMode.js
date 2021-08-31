const RESOLUTIONS_DATABASE_TYPE = process.env.RESOLUTIONS_DATABASE_TYPE;

if (RESOLUTIONS_DATABASE_TYPE === 'inmemory') {
  module.exports.database = require('../storage/memoryDatabase');
  module.exports.Strategy = require('./strategies/memory');
} else if (RESOLUTIONS_DATABASE_TYPE === 'redis') {
  if (process.env.test) {
    module.exports.database = require('../storage/mocks/redis');
  } else {
    module.exports.database = require('../storage/redisDatabase');
  }
  module.exports.Strategy = require('./strategies/redis');
} else if (RESOLUTIONS_DATABASE_TYPE === 'mysql') {
  module.exports.database = require('../storage/mysqlDatabase');
  module.exports.Strategy = require('./strategies/mysql');
}
