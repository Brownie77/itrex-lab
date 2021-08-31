const QUEUE_DATABASE_TYPE = process.env.QUEUE_DATABASE_TYPE;

if (QUEUE_DATABASE_TYPE === 'inmemory') {
  module.exports.database = require('../storage/memoryDatabase');
  module.exports.Strategy = require('./strategies/memory');
} else if (QUEUE_DATABASE_TYPE === 'redis') {
  if (process.env.test) {
    module.exports.database = require('../storage/mocks/redis');
  } else {
    module.exports.database = require('../storage/redisDatabase');
  }
  module.exports.Strategy = require('./strategies/redis');
}
