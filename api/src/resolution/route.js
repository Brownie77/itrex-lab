const { Router } = require('express');
const Controller = require('./controller');

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
 *          example: Dima
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
 *        description: No such patient
 *      500:
 *        description: Unexpected server error
 */

router.get('/:id', Controller.get);

/**
 * @swagger
 *  /resolutions/{name}:
 *    put:
 *     summary: Set resolution
 *     tags:
 *      - Resolution
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                required: true
 *              resolution:
 *                type: string
 *                required: true
 *            example:
 *              name: John
 *              resolution: Some resolution here
 *     responses:
 *      200:
 *        description: The resolution for the patient was successfully set
 *      404:
 *        description: The card doesn't exist
 *      500:
 *        description: Unexpected server error
 */

router.put('/:id', Controller.set);

/**
 * @swagger
 *  /resolutions/{name}:
 *    delete:
 *     summary: Delete the resolution for the patient
 *     tags:
 *      - Resolution
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Patient'
 *     responses:
 *      204:
 *        description: The resolution was successfully deleted
 *      404:
 *        description: There is no such patient
 *      500:
 *        description: Unexpected server error
 */

router.delete('/:id', Controller.delete);

module.exports = router;
