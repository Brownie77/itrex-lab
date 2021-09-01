const { Router } = require('express');
const queueController = require('./initializedController');
const schemas = require('./validationSchemas');
const validate = require('../../middleware/validate');

const router = Router();

/**
 * @swagger
 *  api/v1/queue:
 *    get:
 *     summary: Returns the first patient from the queue
 *     tags:
 *      - Queue
 *     responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Patient'
 *      500:
 *        description: Unexpected server error
 */

router.get('/', queueController.first);

/**
 * @swagger
 *  api/v1/queue:
 *    post:
 *     summary: Add new patient to the queue
 *     tags:
 *      - Queue
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Patient'
 *     responses:
 *      200:
 *        description: The patient was successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Patient'
 *      409:
 *        description: The patient is already in the queue
 *      500:
 *        description: Unexpected server error
 */

router.post('/', queueController.addNewPatient);

/**
 * @swagger
 *  api/v1/queue/next:
 *    get:
 *     summary: Returns next patient in the queue
 *     tags:
 *      - Queue
 *     responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Patient'
 *      500:
 *        description: Unexpected server error
 */

router.get('/next', queueController.next);

router.get('/position', queueController.position);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Patient:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: Patient's name
 *      example:
 *        name: John
 */
