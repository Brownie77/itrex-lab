const Controller = require('./controller');
const Service = require('./service');
const StorageClient = require('./storageClient');
const { database } = require('./currentMode');

module.exports = new Controller(new Service(new StorageClient(database)));
