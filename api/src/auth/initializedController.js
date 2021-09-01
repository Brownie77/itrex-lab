const CabinetController = require('./controller');
const CabinetService = require('./service');
const StorageClient = require('./storageClient');
const CabinetDatabase = require('../storage/mysqlDatabase');
const patientsService = require('../patients/initService');

module.exports = new CabinetController(
  new CabinetService(new StorageClient(CabinetDatabase), patientsService),
);
