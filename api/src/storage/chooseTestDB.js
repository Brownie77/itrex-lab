if (process.env.QUEUE_DATABASE_TYPE === 'inmemory') {
  module.exports.queueDatabase = require('./memoryDatabase');
} else if (process.env.QUEUE_DATABASE_TYPE === 'redis') {
  module.exports.queueDatabase = require('./mocks/redis');
} else throw new Error('Queue doesnt work with mysql');

if (process.env.RESOLUTIONS_DATABASE_TYPE === 'inmemory') {
  module.exports.patientsDatabase = require('./memoryDatabase');
  module.exports.resolutionsDatabase = require('./memoryDatabase');
} else if (process.env.RESOLUTIONS_DATABASE_TYPE === 'redis') {
  module.exports.patientsDatabase = require('./mocks/redis');
  module.exports.resolutionsDatabase = require('./mocks/redis');
} else throw new Error('There are no tests for mysql');
