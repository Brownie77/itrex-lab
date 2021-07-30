const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../view/client.html'));
});

module.exports = router;
