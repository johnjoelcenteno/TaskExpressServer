const express = require('express');
const router = express.Router();

const { CreateCategory, UpdateCategory, GetCategoryById, GetCategoryByUserId, DeleteCateogry, GetGroupedTasksByCategory } = require('../controllers/Category.controller');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware);

router.get('/GetById/:id', GetCategoryById);
router.get('/GetTasksGroupByCategory/', GetGroupedTasksByCategory);
router.post('/', CreateCategory);
router.put('/:id', UpdateCategory);
router.delete('/:id', DeleteCateogry);
router.get('/GetByUserId/:Id', GetCategoryByUserId);

module.exports = router;