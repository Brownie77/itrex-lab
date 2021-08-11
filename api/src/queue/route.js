const { Router } = require('express');
const Controller = require('./controller');

const controller = new Controller();

const router = Router();

/**
 * @swagger
 *  /queue/first:
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

router.get('/first', controller.first);

/**
 * @swagger
 *  /queue:
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

router.post('/', controller.addNewPatient);

/**
 * @swagger
 *  /queue/next:
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

router.get('/next', controller.next);

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
