/* eslint-disable max-classes-per-file */
class GlobalDataError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DataError';
    this.name = 'GlobalDataError';
  }
}

class DataConflictError extends GlobalDataError {
  constructor(message, err) {
    super(message);
    this.causedBy = err || '-';
    this.name = 'DataConfilctError';
  }
}

class DataNotFoundError extends GlobalDataError {
  constructor(message, err) {
    super(message);
    this.causedBy = err || '-';
    this.name = 'DataNotFoundError';
  }
}

class DataForbiddenError extends GlobalDataError {
  constructor(message, err) {
    super(message);
    this.causedBy = err || '-';
    this.name = 'DataForbiddenError';
  }
}

module.exports.DataConflictError = DataConflictError;
module.exports.DataNotFoundError = DataNotFoundError;
module.exports.DataForbiddenError = DataForbiddenError;
