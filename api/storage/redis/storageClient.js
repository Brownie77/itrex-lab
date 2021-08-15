module.exports = class StorageClient {
  constructor(Database, DBname) {
    this.storage = Database;
    this.name = DBname;
  }

  async insert(valOrKey, value = undefined) {}

  async exist(value) {}

  async delete(key = undefined) {}

  async get(key = undefined) {}
};
