const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
// POST /api/users/login
router.post('/login', usersCtrl.logIn);

module.exports = router;