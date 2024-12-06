const { Create: CreateTask, GetByUserId, Update, Delete, GetById, GetTaskByCategory } = require('../services/Tasks.services');
const BaseResponse = require('../utils/BaseReponse.utils');

exports.Create = async (req, res, next) => {
    try {
        const userId = req.claims.UserId;
        const { title, description, dueDate, categoryId } = req.body;

        let id = await CreateTask(userId, title, 'pending', description, dueDate, categoryId);
        return res.send(new BaseResponse({ id }, "Task created successfully", 201));
    } catch (error) {
        next(error);
    }
}

exports.Update = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { UserId: userId } = req.claims;

        const { title, status, description, dueDate, categoryId } = req.body;

        let id = await Update(taskId, userId, title, status, description, dueDate, categoryId);
        return res.send(new BaseResponse({ id }, "Task updated successfully", 200));
    } catch (error) {
        next(error);
    }
}

exports.Delete = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const { UserId } = req.claims;
        const task = await Delete(UserId, taskId);

        return res.send(new BaseResponse({ taskId }, `${task.title} deleted`, 200));
    } catch (error) {
        next(error);
    }
}

exports.GetByUserId = async (req, res, next) => {
    try {
        const userId = req.claims.UserId;
        let result = await GetByUserId(userId);
        return res.send(new BaseResponse(result, 'success', 200));
    } catch (error) {
        next(error);
    }
}

exports.GetTaskById = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        let result = await GetById(taskId);
        return res.send(new BaseResponse(result, 'success', 200));
    } catch (error) {
        next(error);
    }
}

exports.GetByCategoryId = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const { UserId } = req.claims;
        let result = await GetTaskByCategory(UserId, categoryId);
        return res.send(new BaseResponse(result, 'success', 200));
    } catch (error) {
        next(error);
    }
}

