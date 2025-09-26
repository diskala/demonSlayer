const express = require('express');
const router = express.Router();
const {registerPost} = require('../Controller/RegisterController');
router.post('/register', registerPost);
module.exports = router;