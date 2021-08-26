const QueueController = require('./controller');
const Service = require('./service');
const typesEnum = require('../../storage/storageTypes');

const { Database, StorageClient } = require('../../storage/init');

module.exports = new QueueController(
  new Service(new StorageClient(Database, 'Queue', typesEnum.ARRAY)),
);
