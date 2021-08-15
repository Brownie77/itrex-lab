/* eslint-disable max-classes-per-file */
class GlobalDatabaseError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DatabaseError';
    this.name = 'GlobalDatabaseError';
  }
}

class DatabaseAlreadyExistsError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseAlreadyExistsError';
  }
}

class DatabaseWrongTypeError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseWrongTypeError';
  }
}

class DatabaseUnknownTypeError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseUnknownTypeError';
  }
}

module.exports.DatabaseAlreadyExistsError = DatabaseAlreadyExistsError;
module.exports.DatabaseWrongTypeError = DatabaseWrongTypeError;
module.exports.DatabaseUnknownTypeError = DatabaseUnknownTypeError;
