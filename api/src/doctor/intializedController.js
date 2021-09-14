const Controller = require('./DoctorController');
const database = require('../storage/mysqlDatabase');
const RedisClient = require('../queue/strategies/redis')
module.exports = new Controller(database, );
