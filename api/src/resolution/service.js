const jwt = require('jsonwebtoken');
const TimeHelper = require('../../utils/timeHelper');

module.exports = class ResolutionsService {
  constructor(Storage, PatientsService) {
    this.storage = Storage;
    this.patientsService = PatientsService;
  }

  async set(data) {
    const payload = { ...data };
    delete payload.name;

    const { id } = await this.patientsService.getId({
      name: data.name,
    });

    const TTL = payload.ttl || process.env.TTL_DEF;

    payload.ttl = TimeHelper.now() + TimeHelper.minToMs(TTL);

    return this.storage.save({ id }, payload);
  }

  async getByName(data) {
    const patient = await this.patientsService.getId({
      name: data.name,
    });

    const { id } = patient;
    const found = await this.storage.getOne({ where: { id } });

    if (found.ttl && found.ttl > TimeHelper.now()) {
      return found;
    }
    if (found.ttl && found.ttl <= TimeHelper.now()) {
      await this.delete(data);
    }

    return {};
  }

  async get(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    const patient = await this.patientsService.findOne({
      where: { userId: decoded.userId },
      include: [
        {
          model: this.storage.instanceDb.resolution,
          required: false,
        },
      ],
    });

    const found = patient?.resolution?.dataValues;

    if (found && found.ttl > TimeHelper.now()) {
      return found;
    }
    if (found && found.ttl <= TimeHelper.now()) {
      await this.deleteOne({ where: { patientId: patient.id } });
    }

    return null;
  }

  async deleteOne(query) {
    return this.storage.deleteOne(query);
  }

  async delete({ name }) {
    const patient = await this.patientsService.findOne({ where: { name } });
    return this.storage.deleteOne({
      where: { patientId: patient.id },
    });
  }
};
