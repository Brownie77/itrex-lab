const adapt = require('../../utils/adapt');
const status = require('../statuses');

module.exports = class QueueController {
  constructor(Service) {
    this.service = Service;
  }

  next = async (req, res, next) => {
    try {
      const patient = await this.service.getNext();

      return res.status(status.OK).send(patient);
    } catch (error) {
      return next(error);
    }
  };

  first = async (req, res, next) => {
    try {
      const patient = await this.service.get();
      return res.status(status.OK).send(patient);
    } catch (error) {
      return next(error);
    }
  };

  addNewPatient = async (req, res, next) => {
    try {
      const config = {
        props: [
          {
            where: 'body',
            what: 'name',
            do: ['capitalize'],
          },
        ],
      };

      const patient = adapt(config, req);
      await this.service.enqueue(patient);

      return res.status(status.CREATED).send();
    } catch (error) {
      return next(error);
    }
  };
};
