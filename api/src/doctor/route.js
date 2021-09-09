const { Router } = require('express');
const validate = require('../../middleware/validate');
const DoctorController = require('./intializedController');

const router = Router();

router.post('/add', DoctorController.add);
router.post('/add/specialty', DoctorController.addSpeciality);
router.get('/all', DoctorController.all)
module.exports = router;
