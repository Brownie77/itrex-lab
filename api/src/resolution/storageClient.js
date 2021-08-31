const { Strategy } = require('./currentStrategy');

module.exports = class ResolutionsStorageClient {
  constructor(database) {
    this.storageName = 'Resolutions';
    this.strategy = new Strategy(database, this.storageName);
    console.log(`Resolutions Service uses ${database.type} storage`);
  }

  async save(key, value) {
    return this.strategy.save(key, value);
  }

  /**
   *
   * query example : { where: { id: 1, name: 'John'} } || { where: { name: 'John'} }
   *
   */

  async getOne(query) {
    return this.strategy.getOne(query);
  }

  async deleteOne(query) {
    return this.strategy.deleteOne(query);
  }
};
