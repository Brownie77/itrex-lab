const QueueService = require('./service');
const { ok } = require('../statuses');

module.exports = class QueueController {
  constructor() {
    this.service = new QueueService();
  }

  next = (req, res, next) => {
    try {
      const nextPatient = this.service.getNext();

      return res.status(ok).send(nextPatient);
    } catch (error) {
      return next(error);
    }
  };

  first = (req, res, next) => {
    try {
      const patient = this.service.getFirst();

      return res.status(ok).send(patient);
    } catch (error) {
      return next(error);
    }
  };

  addNewPatient = (req, res, next) => {
    try {
      const data = req.body;

      this.service.enqueue(data);

      return res.status(ok).send();
    } catch (error) {
      return next(error);
    }
  };
};
