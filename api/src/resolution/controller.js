const adapt = require('../../utils/adapt');
const decorate = require('../../utils/decorate');
const schema = require('./outputSchemas');
const status = require('../statuses');

module.exports = class ResolutionController {
  constructor(Service) {
    this.service = Service;
  }

  get = async (req, res, next) => {
    try {
      const config = {
        props: [
          {
            where: 'params',
            what: 'patientId',
            as: 'name', // save as
          },
        ],
      };
      const data = adapt(config, req);

      let response = await this.service.get(data);
      response = decorate(schema.resolution, response);

      return res.status(status.OK).send(response);
    } catch (error) {
      return next(error);
    }
  };

  set = async (req, res, next) => {
    try {
      const config = {
        props: [
          {
            where: 'params',
            what: 'patientId',
            as: 'name',
            do: ['capitalize'],
          },
          {
            where: 'body',
            what: 'resolution',
            do: ['trim'],
          },
          {
            where: 'body',
            what: 'ttl',
          },
        ],
      };
      const data = adapt(config, req);

      await this.service.set(data);

      return res.status(status.CREATED).send();
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const config = {
        props: [
          {
            where: 'params',
            what: 'patientId',
            as: 'name',
            do: ['capitalize'],
          },
        ],
      };
      const data = adapt(config, req);
      await this.service.delete(data);

      return res.status(status.NO_CONTENT).send();
    } catch (error) {
      return next(error);
    }
  };
};
