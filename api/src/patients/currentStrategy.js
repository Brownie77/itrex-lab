const RESOLUTIONS_DATABASE_TYPE = process.env.RESOLUTIONS_DATABASE_TYPE;

if (RESOLUTIONS_DATABASE_TYPE === 'inmemory') {
  module.exports.Strategy = require('./strategies/memory');
} else if (RESOLUTIONS_DATABASE_TYPE === 'redis') {
  module.exports.Strategy = require('./strategies/redis');
} else if (RESOLUTIONS_DATABASE_TYPE === 'mysql') {
  module.exports.Strategy = require('./strategies/mysql');
}
