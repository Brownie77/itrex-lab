const { DatabaseAlreadyExistsError } = require('../errors/customDatabaseErrs');

// making sure we will ALWAYS have only one instance of the database
module.exports = new (class Database {
  allocateArray(name) {
    if (this[name]) {
      throw new DatabaseAlreadyExistsError(
        `Database name ${name} is already in use.`,
      );
    } else {
      this[name] = [];
    }
  }

  allocateMap(name) {
    if (this[name]) {
      throw new DatabaseAlreadyExistsError(
        `Database name ${name} is already in use.`,
      );
    } else {
      this[name] = new Map();
    }
  }
})();
