const {
    GetCategoryById,
    GetByUserId,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    GetTasksGroupedByCategories
} = require('../services/Category.services');
const BaseResponse = require('../utils/BaseReponse.utils');
const BaseRepsonse = require('../utils/BaseReponse.utils');

exports.CreateCategory = async (req, res, next) => {
    try {
        const { title } = req.body;
        const userId = req.claims.userId;
        let id = await CreateCategory(title, userId);
        return res.send(new BaseResponse({ id }, "Category created successfuly", 201));
    } catch (error) {
        next(error);
    }
}

exports.UpdateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.claims.userId;
        const { title } = req.body;

        let result = await UpdateCategory(id, userId, title);
        return res.send(new BaseResponse(result, "Updated successfully", 200));
    } catch (error) {
        next(error);
    }
}

exports.GetCategoryById = async (req, res, next) => {
    try {
        const { userId } = req.claims;
        const { id } = req.params;
        console.log({ id, userId });
        const result = await GetCategoryById(id, userId);
        return res.send(new BaseResponse(result, "Success", 200));
    } catch (error) {
        next(error);
    }
}

exports.GetCategoryByUserId = async (req, res, next) => {
    try {
        const { userId } = req.claims;
        const result = await GetByUserId(userId);
        return res.send(new BaseResponse(result, "Success", 200));
    } catch (error) {
        next(error);
    }
}

exports.DeleteCateogry = async (req, res, next) => {
    try {
        const { userId } = req.claims;
        const { id } = req.params;
        const result = await DeleteCategory(id, userId);
        return res.send(new BaseResponse(result, "Category deleted", 200));
    } catch (error) {
        next(error);
    }
}

exports.GetGroupedTasksByCategory = async (req, res, next) => {
    try {
        const { userId } = req.claims;
        const result = await GetTasksGroupedByCategories(userId);
        return res.send(new BaseResponse(result, "Successful", 200));
    } catch (error) {
        next(error);
    }
}