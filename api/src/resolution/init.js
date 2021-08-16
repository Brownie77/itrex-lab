const Controller = require('./controller');
const Service = require('./service');
const typesEnum = require('../../storage/storageTypes');

const { Database, StorageClient } = require('../../storage/init');

module.exports = new Controller(
  new Service(new StorageClient(Database, 'Resolutions', typesEnum.MAP)),
);
