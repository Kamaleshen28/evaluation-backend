const express = require('express');
const router = express.Router();
const controllers = require('../controllers/company');


router.post('/save', controllers.addCompany);
router.put('/update/:id', controllers.updateCompanyDetails);

module.exports = router;