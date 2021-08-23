const Database = require(`./${process.env.DATABASE_TYPE}/database`);
const StorageClient = require('./storageClient');

module.exports.StorageClient = StorageClient;
module.exports.Database = new Database(); // the database will always be the same instance
