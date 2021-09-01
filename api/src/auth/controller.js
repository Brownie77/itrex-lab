const adapt = require('../../utils/adapt');
const status = require('../statuses');

module.exports = class AuthController {
  constructor(Service) {
    this.service = Service;
  }

  register = async (req, res, next) => {
    try {
      const data = adapt(
        {
          props: [
            { where: 'body', what: 'name' },
            { where: 'body', what: 'email' },
            { where: 'body', what: 'gender' },
            { where: 'body', what: 'password' },
            { where: 'body', what: 'confirmPassword' },
            { where: 'body', what: 'birthdate' },
          ],
        },
        req,
      );
      await this.service.register(data);

      return res.status(status.CREATED).send();
    } catch (error) {
      return next(error);
    }
  };

  authenticate = async (req, res, next) => {
    try {
      const data = adapt(
        {
          props: [{ where: 'cookies', what: 'access_token', onError: 401 }],
        },
        req,
      );
      // await this.service.authenticate(data);

      return res.status(status.OK).send();
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const data = adapt(
        {
          props: [
            { where: 'body', what: 'email' },
            { where: 'body', what: 'password' },
          ],
        },
        req,
      );
      const accessToken = await this.service.login(data);

      return res
        .status(status.OK)
        .cookie('access_token', accessToken, {
          expires: new Date(Date.now() + 8 * 3600000),
          httpOnly: true,
        })
        .send();
    } catch (error) {
      return next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      return res.status(status.OK).clearCookie('access_token').send();
    } catch (error) {
      return next(error);
    }
  };

  notAuthenticated = async (req, res, next) => {
    try {
      if (req.cookies.access_token) {
        return res.status(status.OK).send(true);
      }
      return res.status(status.OK).send(false);
    } catch (error) {
      return next(error);
    }
  };
};
