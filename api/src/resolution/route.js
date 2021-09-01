const { Router } = require('express');
const resolutionController = require('./initializedController');
const validate = require('../../middleware/validate');
const schemas = require('./validationSchemas');

const router = Router();

/**
 * @swagger
 *  api/v1/patients/{patientId}/resolutions:
 *    get:
 *     summary: Returns the resolution for the patient
 *     tags:
 *      - Resolution
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *          required: true
 *          description: Patient's name
 *     responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example:
 *                reolution: Some text here
 *      404:
 *        description: Card doesn't exist
 *      500:
 *        description: Unexpected server error
 */

router.get(
  '/:patientId/resolutions',
  validate({ params: schemas.IDSchema }),
  resolutionController.get,
);

/**
 * @swagger
 *  api/v1/patients/{patientId}/resolution:
 *    put:
 *     summary: Set resolution
 *     tags:
 *      - Resolution
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *          required: true
 *          description: Patient's name
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              resolution:
 *                type: string
 *                required: true
 *            example:
 *              resolution: Some resolution here
 *     responses:
 *      200:
 *        description: The resolution for the patient was successfully set
 *      500:
 *        description: Unexpected server error
 */

router.put(
  '/:patientId/resolution',
  validate({ params: schemas.IDSchema, body: schemas.resolutionSchema }),
  resolutionController.set,
);

router.get('/resolution', resolutionController.ownResolution);

/**
 * @swagger
 *  api/v1/patients/{patientId}/resolutions:
 *    delete:
 *     summary: Delete the resolution for the patient
 *     tags:
 *      - Resolution
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *          required: true
 *          description: Patient's name
 *     responses:
 *      200:
 *        description: The resolution was successfully deleted
 *      404:
 *        description: There is no such patient
 *      500:
 *        description: Unexpected server error
 */

router.delete(
  '/:patientId/resolutions',
  validate({ params: schemas.IDSchema }),
  resolutionController.delete,
);

module.exports = router;
