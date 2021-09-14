const { Router } = require('express');
const validate = require('../../middleware/validate');
const DoctorController = require('./intializedController');

const router = Router();

router.post('/add', DoctorController.add);
router.post('/specialty/add', DoctorController.addSpeciality);
router.get('/all', DoctorController.all);
router.get('/specialty/all', DoctorController.allSpecialites);
router.post('/current', DoctorController.current);

module.exports = router;
