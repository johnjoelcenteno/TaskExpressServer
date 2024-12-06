const Task = require('../models/Tasks.model');
const Category = require('../models/Category.model');
const CustomErr = require('../utils/CustomError.utils');
const { isRequired, isDate } = require('../utils/Validators.utils');

const rules = {
    title: [isRequired],
    description: [isRequired],
    dueDate: [isDate]
};

exports.Create = async (userId, title, status, description, dueDate, categoryId) => {

    let task = Task.CreateTask(userId, title, status, description, dueDate, categoryId);

    CustomErr.validateFields(task, rules);
    return await Task.Insert(task);
}

exports.GetByUserId = async (userId) => {
    let tasks = await Task.GetByUserId(userId);
    return tasks;
}

exports.GetById = async (taskId) => {
    let task = await Task.GetById(taskId);
    return task;
}

exports.Update = async (taskId, userId, title, status, description, dueDate, categoryId) => {
    let taskUpdateModel = Task.CreateTask(userId, title, status, description, dueDate, categoryId);
    rules.status = [isRequired];
    CustomErr.validateFields(taskUpdateModel, rules);

    let task = await Task.GetByUserIdAndTaskId(userId, taskId);
    if (!task.length) throw new CustomErr(`Task ${taskId} not found`, 404);

    await Task.Update(taskId, taskUpdateModel);
    return taskId;
}

exports.Delete = async (userId, taskId) => {
    const task = await Task.GetByUserIdAndTaskId(userId, taskId);
    if (!task.length) throw new CustomErr("Task not found", 404);

    await Task.Delete(userId, taskId);
    return task;
}

exports.GetTaskByCategory = async (userId, categoryId) => {
    const category = await Category.GetById(categoryId);

    if (!category) throw new CustomErr("Category not found", 404);

    const tasks = await Task.GetByCategoryIdAndUserId(userId, categoryId);
    return tasks;
}