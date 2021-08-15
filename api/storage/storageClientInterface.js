const { InterfaceViolationError } = require('../errors/customInterfaceErrs');

module.exports = class StorageClientInterface {
  constructor() {
    if (!this.insert) {
      throw new InterfaceViolationError(
        'StorageClient must have insert method',
      );
    }
    if (!this.exist) {
      throw new InterfaceViolationError('StorageClient must have exist method');
    }
    if (!this.delete) {
      throw new InterfaceViolationError(
        'StorageClient must have delete method',
      );
    }
    if (!this.get) {
      throw new InterfaceViolationError('StorageClient must have get method');
    }
  }
};
