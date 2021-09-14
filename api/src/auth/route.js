const { Router } = require('express');
const authController = require('./initializedController');
const schemas = require('./validationSchemas');
const validate = require('../../middleware/validate');

const router = Router();

router.post(
  '/registration',
  validate({ body: schemas.userSchema }),
  authController.registration,
);

router.post(
  '/login',
  validate({ body: schemas.loginSchema }),
  authController.login,
);
router.post(
  '/login/doctor',
  validate({ body: schemas.loginSchema }),
  authController.loginDoctor,
);

router.post('/authenticate', authController.authenticate);

router.post('/not-authenticated', authController.notAuthenticated);

router.post('/logout', authController.logout);

module.exports = router;
