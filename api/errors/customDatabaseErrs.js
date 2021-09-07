/* eslint-disable max-classes-per-file */
class GlobalDatabaseError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DatabaseError';
    this.name = 'GlobalDatabaseError';
  }
}

class DatabaseFailedToConnectError extends GlobalDatabaseError {
  constructor(message, err) {
    super(message);
    this.causedBy = err || '-';
    this.name = 'DatabaseFailedToConnectError';
  }
}

module.exports.DatabaseFailedToConnectError = DatabaseFailedToConnectError;
