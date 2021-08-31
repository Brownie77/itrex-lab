const AuthController = require('./controller');
const AuthService = require('./service');
const StorageClient = require('./storageClient');
const authDatabase = require('../storage/mysqlDatabase');
const patientsService = require('../patients/initService');

module.exports = new AuthController(
  new AuthService(new StorageClient(authDatabase), patientsService),
);
