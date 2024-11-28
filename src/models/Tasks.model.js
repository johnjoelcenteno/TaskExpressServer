const { poolPromise, sql } = require('../utils/db.utils');

class Task {
    static CreateTask(userId, title, status, description, dueDate) {
        return {
            userId,
            title,
            status,
            description,
            dueDate
        };
    }

    static async GetById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('TaskId', sql.Int, id)
            .query(`
        SELECT * FROM Tasks
        WHERE TaskId = @TaskId
      `);

        return result.recordset[0];
    }

    static async GetByUserId(userId) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('UserId', sql.Int, userId)
            .query(`
                  SELECT * FROM Tasks
                  WHERE UserId = @UserId
            `);

        return result.recordset;
    }

    static async GetByUserIdAndTaskId(userId, taskId) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('UserId', sql.Int, userId)
            .input('TaskId', sql.Int, taskId)
            .query(`
                  SELECT * FROM Tasks
                  WHERE UserId = @UserId AND TaskId = @TaskId
            `);

        return result.recordset;
    }

    static async Insert(task) {
        const { userId, title, description, dueDate } = task;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('UserId', sql.Int, userId)
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description || null)
            .input('DueDate', sql.DateTime, dueDate || null)
            .input('Status', sql.NVarChar, 'Pending')
            .query(`
        INSERT INTO Tasks (UserId, Title, Description, DueDate, Status, CreatedAt, UpdatedAt)
        VALUES (@UserId, @Title, @Description, @DueDate, @Status, GETDATE(), GETDATE());
        SELECT SCOPE_IDENTITY() AS TaskId;
      `);

        return result.recordset[0].TaskId;
    }

    static async Update(taskId, task) {
        const pool = await poolPromise;

        await pool.request()
            .input('TaskId', sql.Int, taskId)
            .input('Title', sql.NVarChar, task.title)
            .input('Description', sql.NVarChar, task.description || null)
            .input('Status', sql.NVarChar, task.status)
            .input('DueDate', sql.DateTime, task.dueDate || null)
            .query(`
            UPDATE Tasks
            SET 
                Title = @Title,
                Description = @Description,
                Status = @Status,
                DueDate = @DueDate,
                UpdatedAt = GETDATE()
            WHERE TaskId = @TaskId
        `);

        return task.TaskId;
    }

    static async Delete(userId, taskId) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('TaskId', sql.Int, taskId)
            .input('UserId', sql.Int, userId)
            .query(`
                DELETE FROM Tasks
                WHERE TaskId = @TaskId AND UserId = @UserId
            `);

        return taskId;
    }
}

module.exports = Task;