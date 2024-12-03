const { Create: CreateTask, GetByUserId, Update, Delete, GetById } = require('../services/Tasks.services');
const BaseResponse = require('../utils/BaseReponse.utils');

exports.Create = async (req, res, next) => {
    try {
        const userId = req.claims.userId;
        const { title, description, dueDate } = req.body;
        let id = await CreateTask(userId, title, 'pending', description, dueDate);
        return res.send(new BaseResponse({ id }, "Task created successfully", 201));
    } catch (error) {
        next(error);
    }
}

exports.Update = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { userId } = req.claims;

        const { title, status, description, dueDate } = req.body;

        console.log({ title, status, description, dueDate });
        let id = await Update(taskId, userId, title, status, description, dueDate);
        return res.send(new BaseResponse({ id }, "Task updated successfully", 200));
    } catch (error) {
        next(error);
    }
}

exports.Delete = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const { userId } = req.claims;
        const task = await Delete(userId, taskId);

        return res.send(new BaseResponse({ taskId }, `${task.title} deleted`, 200));
    } catch (error) {
        next(error);
    }
}

exports.GetByUserId = async (req, res, next) => {
    try {
        const userId = req.claims.userId;
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

