const Controller = require('./controller');
const Service = require('./service');
const PatientsService = require('../patients/initService');
const StorageClient = require('./storageClient');
const { database } = require('./currentDatabase');

module.exports = new Controller(
  new Service(new StorageClient(database), PatientsService),
);
