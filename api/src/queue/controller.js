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
            where: 'cookies',
            what: 'access_token',
            onError: 401,
          },
        ],
      };

      const { access_token: accessToken } = adapt(config, req);
      await this.service.enqueue(accessToken);

      return res.status(status.CREATED).send();
    } catch (error) {
      return next(error);
    }
  };

  position = async (req, res, next) => {
    try {
      const config = {
        props: [
          {
            where: 'cookies',
            what: 'access_token',
            onError: 401,
          },
        ],
      };

      const { access_token: accessToken } = adapt(config, req);
      const pos = await this.service.getPosition(accessToken);

      return res.status(status.CREATED).send({ position: pos });
    } catch (error) {
      return next(error);
    }
  };
};
