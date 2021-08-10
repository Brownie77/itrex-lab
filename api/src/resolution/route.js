const { Router } = require('express');
const ResolutionController = require('./controller');
const validate = require('../../middleware/validate');
const schemas = require('./validationSchemas');

const controller = new ResolutionController();

const router = Router();

/**
 * @swagger
 *  /resolutions/{name}:
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

router.get('/:id', validate({ params: schemas.IDSchema }), controller.get);

/**
 * @swagger
 *  /resolutions/{name}:
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
  '/:id',
  validate({ params: schemas.IDSchema, body: schemas.resolutionSchema }),
  controller.set,
);

/**
 * @swagger
 *  /resolutions/{name}:
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
  '/:id',
  validate({ params: schemas.IDSchema }),
  controller.delete,
);

module.exports = router;
