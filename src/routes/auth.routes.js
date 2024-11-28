const express = require('express');
const router = express.Router();

const { login, logout, token } = require('../controllers/auth.controller');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');

router.post('/login', login);
router.post('/logout', authenticationMiddleware, logout);
router.post('/token', authenticationMiddleware, token);

module.exports = router;