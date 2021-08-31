const RESOLUTIONS_DATABASE_TYPE = process.env.RESOLUTIONS_DATABASE_TYPE;

if (RESOLUTIONS_DATABASE_TYPE === 'inmemory') {
  module.exports.database = require('../storage/memoryDatabase');
} else if (RESOLUTIONS_DATABASE_TYPE === 'redis') {
  module.exports.database = require('../storage/redisDatabase');
} else if (RESOLUTIONS_DATABASE_TYPE === 'mysql') {
  module.exports.database = require('../storage/mysqlDatabase');
}
