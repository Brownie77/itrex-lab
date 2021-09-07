const QUEUE_DATABASE_TYPE = process.env.QUEUE_DATABASE_TYPE;

if (QUEUE_DATABASE_TYPE === 'inmemory') {
  module.exports.Strategy = require('./strategies/memory');
} else if (QUEUE_DATABASE_TYPE === 'redis') {
  module.exports.Strategy = require('./strategies/redis');
}
