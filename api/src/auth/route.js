const { Router } = require('express');
const authController = require('./initializedController');
const schemas = require('./validationSchemas');
const validate = require('../../middleware/validate');

const router = Router();

router.post(
  '/register',
  validate({ body: schemas.userSchema }),
  authController.register,
);

router.post(
  '/login',
  validate({ body: schemas.loginSchema }),
  authController.login,
);

router.post('/authenticate', authController.authenticate);

router.post('/is-authenticated', authController.isAuthenticated);

router.post('/logout', authController.logout);

module.exports = router;
