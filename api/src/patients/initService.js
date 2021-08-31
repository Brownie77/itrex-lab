const PatientsService = require('./service');
const { database } = require('./currentMode');
const PatientsStorageClient = require('./storageClient');

module.exports = new PatientsService(new PatientsStorageClient(database));
