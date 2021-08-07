const { Router } = require('express');

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
 *      404:
 *        description: The queue is empty
 *      500:
 *        description: Unexpected server error
 */

router.get('/first', (req, res) => {
  res.status(200).send({ name: 1 });
});

/**
 * @swagger
 *  /queue/add:
 *    post:
 *     summary: Add a new patient to the queue
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

router.post('/add', (req, res) => {
  const { name } = req.body;
  res.status(200).send({ name });
});

/**
 * @swagger
 *  /queue/delete:
 *    delete:
 *     summary: Delete the first patient from the queue
 *     tags:
 *      - Queue
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Patient'
 *     responses:
 *      204:
 *        description: The patient was successfully dequeued
 *      404:
 *        description: There is no such patient in the queue
 *      500:
 *        description: Unexpected server error
 */

router.delete('/delete', (req, res) => {
  res.status(200).send();
});

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
