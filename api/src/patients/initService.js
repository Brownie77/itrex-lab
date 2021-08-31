const PatientsService = require('./service');
const { database } = require('./currentDatabase');
const PatientsStorageClient = require('./storageClient');

module.exports = new PatientsService(new PatientsStorageClient(database));
