const config = require('../config');

const Database = require(`./${config.database.type}/database`);
const StorageClient = require(`./${config.database.type}/storageClient`);

module.exports.StorageClient = StorageClient;
module.exports.Database = new Database(); // the database will always be the same instance
