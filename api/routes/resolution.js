const { Router } = require('express');

const router = Router();

router.post('/add', (req, res) => {
  res.status(200).send('ok');
});

router.get('/get/:id', (req, res) => {
  res.status(200).send({ name: req.params.id, resolution: 'text' });
});

router.put('/set', (req, res) => {
  res.status(200).send('set');
});

router.delete('/delete', (req, res) => {
  res.status(200).send('delete');
});

module.exports = router;
