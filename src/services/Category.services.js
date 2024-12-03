const CategoryDb = require('../models/Category.model');
const CustomErr = require('../utils/CustomError.utils');
const { isRequired } = require('../utils/Validators.utils');

const rules = {
    categoryTitle: [isRequired],
}

exports.GetCategoryById = async (categoryId, userId) => {
    // only show the categories of the user
    // if db query is null return data: null it's not showing data. 
    console.log({ categoryId });
    const result = await CategoryDb.GetById(categoryId);
    console.log({ result }, 'from category service');
    return result;
}

exports.GetByUserId = async (userId) => {
    const result = await CategoryDb.GetByUserId(userId);
    return result;
}

exports.CreateCategory = async (categoryTitle, userId) => {
    const category = CategoryDb.CreateCategory(categoryTitle, userId);
    CustomErr.validateFields(category, rules);
    return await CategoryDb.Create(categoryTitle, userId);
}

exports.UpdateCategory = async (id, userId, categoryTitle) => {
    const category = await CategoryDb.GetByIdAndUserId(id, userId);
    if (!category) {
        throw new CustomErr("Category not found", 404);
    }
    const result = await CategoryDb.Update(id, categoryTitle);
    return result;
}

exports.DeleteCategory = async (id, userId) => {
    const category = await CategoryDb.GetByIdAndUserId(id, userId);
    if (!category) {
        throw new CustomErr("Category not found", 404);
    }
    const result = await CategoryDb.Delete(id);
    return result;
}

exports.GetTasksGroupedByCategories = async (userId) => {
    const result = await CategoryDb.GetTasksGroupedByCategories(userId);
    console.log(result, 'result from group by');
    return result;
}



