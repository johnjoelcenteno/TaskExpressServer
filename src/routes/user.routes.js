const express = require('express');
const router = express.Router();

const { GetUser } = require('../controllers/User.controller');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware);
router.get('/', GetUser);

module.exports = router;

