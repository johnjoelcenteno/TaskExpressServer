const express = require('express');
const router = express.Router();

const { Create, Update, Delete, GetByUserId, GetTaskById } = require('../controllers/Tasks.controller');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware);
router.get('/', GetByUserId);
router.get('/getById/:id', GetTaskById);
router.post('/', Create);
router.put('/:id', Update);
router.delete('/:id', Delete);

module.exports = router;