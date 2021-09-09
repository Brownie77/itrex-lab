const Controller = require('./DoctorController');
const database = require('../storage/mysqlDatabase');

module.exports = new Controller(database);
