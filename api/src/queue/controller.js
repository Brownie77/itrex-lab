const status = require('../statuses');

module.exports = class QueueController {
  constructor(Service) {
    this.service = Service;
  }

  next = async (req, res, next) => {
    try {
      const nextPatient = await this.service.getNext();

      return res.status(status.OK).send(nextPatient);
    } catch (error) {
      return next(error);
    }
  };

  first = async (req, res, next) => {
    try {
      const patient = await this.service.getFirst();

      return res.status(status.OK).send(patient);
    } catch (error) {
      return next(error);
    }
  };

  addNewPatient = async (req, res, next) => {
    try {
      const data = req.body;

      await this.service.enqueue(data);

      return res.status(status.CREATED).send();
    } catch (error) {
      return next(error);
    }
  };
};
