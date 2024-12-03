const { poolPromise, sql } = require('../utils/db.utils');

class Category {
    static CreateCategory(categoryTitle, userId) {
        return {
            categoryTitle,
            userId
        };
    }

    static async GetTasksGroupedByCategories(userId) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('UserId', sql.Int, userId)
                .query(`
                SELECT 
                    c.CategoryId,
                    c.Title AS Name,
                    COUNT(CASE WHEN t.Status = 'Pending' THEN t.TaskId END) AS TaskCount,
                    t.TaskId,
                    t.Title AS TaskTitle,
                    t.Description, 
                    t.Status,
                    t.DueDate
                FROM 
                    Categories c 
                LEFT JOIN 
                    Tasks t ON c.CategoryId = t.CategoryId AND t.Status = 'Pending'
                WHERE 
                    c.UserId = @UserId 
                GROUP BY 
                    c.CategoryId, c.Title, t.TaskId, t.Title, t.Description, t.Status, t.DueDate
                ORDER BY 
                    c.CategoryId, t.TaskId;
            `);

            const groupedData = result.recordset.reduce((acc, row) => {
                const { CategoryId, TaskCount, Name, TaskId, TaskTitle, Description, Status, DueDate } = row;

                if (!acc[CategoryId]) {
                    acc[CategoryId] = {
                        taskCount: TaskCount, // Accurate count of pending tasks
                        categoryId: CategoryId,
                        name: Name,
                        tasks: []
                    };
                }

                // Add only pending tasks to the tasks array
                if (TaskId && Status === 'Pending') {
                    acc[CategoryId].tasks.push({
                        title: TaskTitle,
                        description: Description,
                        taskId: TaskId,
                        status: Status,
                        dueDate: DueDate,
                        categoryId: CategoryId,
                        categoryName: Name
                    });
                }

                return acc;
            }, {});

            return Object.values(groupedData);
        } catch (error) {
            console.error('Error fetching tasks grouped by categories:', error);
            throw error;
        }
    }

    static async GetByUserId(userId) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('UserId', sql.Int, userId)
                .query('SELECT * FROM Categories WHERE UserId = @UserId');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching Category by UserId:', error);
            throw error;
        }
    }

    static async GetById(categoryId) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('CategoryId', sql.Int, categoryId)
                .query('SELECT * FROM Categories WHERE CategoryId = @CategoryId');

            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching category by Id:', error);
            throw error;
        }
    }

    static async GetByIdAndUserId(categoryId, userId) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('CategoryId', sql.Int, categoryId)
                .input('UserId', sql.Int, userId)
                .query('SELECT * FROM Categories WHERE CategoryId = @CategoryId AND UserId = @UserId');

            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching category by Id:', error);
            throw error;
        }
    }

    static async Create(categoryTitle, userId) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('CategoryTitle', sql.NVarChar(255), categoryTitle)
                .input('UserId', sql.Int, userId)
                .query(
                    `
                        INSERT INTO Categories (Title, UserId, CreatedAt) 
                        VALUES (@CategoryTitle, @UserId, GETDATE());
                        SELECT SCOPE_IDENTITY() AS CategoryId;
                    `
                );

            return result.recordset[0];
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    }


    static async Update(categoryId, updatedTitle) {
        try {
            const pool = await poolPromise;
            await pool
                .request()
                .input('CategoryId', sql.Int, categoryId)
                .input('UpdatedTitle', sql.NVarChar(255), updatedTitle)
                .query(
                    `UPDATE Categories 
                     SET Title = @UpdatedTitle, UpdatedAt = GETDATE() 
                     WHERE CategoryId = @CategoryId`
                );
            return categoryId;
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    }

    static async Delete(categoryId) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('CategoryId', sql.Int, categoryId)
                .query(
                    `DELETE FROM Categories 
                     OUTPUT DELETED.CategoryId, DELETED.Title
                     WHERE CategoryId = @CategoryId`
                );

            return result.recordset[0];
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
}

module.exports = Category;
