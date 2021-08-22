const ResolutionController = require('./controller');
const Service = require('./service');
const typesEnum = require('../../storage/storageTypes');

const { Database, StorageClient } = require('../../storage/init');

module.exports = new ResolutionController(
  new Service(new StorageClient(Database, 'Resolutions', typesEnum.MAP)),
);
