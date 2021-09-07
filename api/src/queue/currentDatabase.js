const { QUEUE_DATABASE_TYPE } = process.env;

if (QUEUE_DATABASE_TYPE === 'inmemory') {
  module.exports.database = require('../storage/memoryDatabase');
} else if (QUEUE_DATABASE_TYPE === 'redis') {
  module.exports.database = require('../storage/redisDatabase');
}
