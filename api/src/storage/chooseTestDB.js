if (process.env.QUEUE_DATABASE_TYPE === 'inmemory') {
  module.exports.queueDatabase = require('./memoryDatabase');
} else if (process.env.QUEUE_DATABASE_TYPE === 'redis') {
  module.exports.queueDatabase = require('./mocks/redis');
} else throw new Error('Queue doesnt work with mysql');
