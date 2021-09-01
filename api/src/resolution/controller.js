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

      let response = await this.service.getByName(data);
      response = decorate(schema.resolution, response);

      return res.status(status.OK).send(response);
    } catch (error) {
      return next(error);
    }
  };

  ownResolution = async (req, res, next) => {
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
      const response = await this.service.get(accessToken);

      return res.status(status.OK).send({ resolution: response });
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
