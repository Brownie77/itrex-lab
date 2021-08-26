const StrategyInterface = require('../../strategyInterface');

module.exports = class MapStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage.client;
    this.name = name;
    this.model = storage.resolution;
  }

  async insert(key, { resolution, ttl }) {
    return this.model.create({ resolution, ttl, PatientId: key });
  }

  async exist(key) {
    const data = await this.model.findAll({ where: { PatientId: key } });
    return data.length !== 0;
  }

  async delete(key) {
    return this.model.destroy({ where: { PatientId: key } });
  }

  async get(key) {
    const data = await this.model.findAll({ where: { PatientId: key } });

    return data[0].dataValues;
  }
};
