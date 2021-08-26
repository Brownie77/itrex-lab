const QueueController = require('./controller');
const Service = require('./service');
const typesEnum = require('../../storage/storageTypes');

const QueueMapStrategy = require(`../../storage/${process.env.QUEUE_DATABASE_TYPE}/strategies/map`);
const QueueArrayStrategy = require(`../../storage/${process.env.QUEUE_DATABASE_TYPE}/strategies/array`);

const PatientsMapStrategy = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/strategies/map`);
const PatientsArrayStrategy = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/strategies/array`);

const QueueDatabase = require(`../../storage/${process.env.QUEUE_DATABASE_TYPE}/database`);
const PatientsDatabase = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/database`);
const StorageClient = require('../../storage/storageClient');

module.exports = new QueueController(
  new Service(
    new StorageClient(
      QueueDatabase,
      'Queue',
      typesEnum.ARRAY,
      QueueMapStrategy,
      QueueArrayStrategy,
    ),
    new StorageClient(
      PatientsDatabase,
      'Patients',
      typesEnum.ARRAY,
      PatientsMapStrategy,
      PatientsArrayStrategy,
    ),
  ),
);
