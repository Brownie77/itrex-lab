const { Router } = require('express');

const router = Router();

/**
 * @swagger
 *  /resolution/get/{name}:
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

router.get('/get/:id', (req, res) => {
  res.status(200).send({ name: req.params.id, resolution: 'text' });
});

/**
 * @swagger
 *  /resolution/add:
 *    post:
 *     summary: Create new patient's card
 *     tags:
 *      - Resolution
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
 *        description: The card already exists
 *      500:
 *        description: Unexpected server error
 */

router.post('/add', (req, res) => {
  res.status(200).send('ok');
});

/**
 * @swagger
 *  /resolution/set:
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

router.put('/set', (req, res) => {
  res.status(200).send('set');
});

/**
 * @swagger
 *  /resolution/delete:
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

router.delete('/delete', (req, res) => {
  res.status(200).send('delete');
});

module.exports = router;
