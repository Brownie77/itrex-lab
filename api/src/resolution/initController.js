const ResolutionController = require('./controller');
const Service = require('./service');
const typesEnum = require('../../storage/storageTypes');

const ResolutionsMapStrategy = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/strategies/map`);
const ResolutionsArrayStrategy = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/strategies/array`);

const PatientsMapStrategy = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/strategies/map`);
const PatientsArrayStrategy = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/strategies/array`);

const ResolutionsDatabase = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/database`);
const PatientsDatabase = require(`../../storage/${process.env.RESOLUTIONS_DATABASE_TYPE}/database`);
const StorageClient = require('../../storage/storageClient');

module.exports = new ResolutionController(
  new Service(
    new StorageClient(
      ResolutionsDatabase,
      'Resolutions',
      typesEnum.MAP,
      ResolutionsMapStrategy,
      ResolutionsArrayStrategy,
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
