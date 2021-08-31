const PatientsService = require('./service');
const database = require('../storage/mysqlDatabase');
const PatientsStorageClient = require('./storageClient');

module.exports = new PatientsService(new PatientsStorageClient(database));
