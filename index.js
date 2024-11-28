const express = require('express');
const app = express();
app.use(express.json());

// Middlewares
const { globalErrorHandlingMiddleware } = require('./src/middlewares/globalErrorHandling.middleware');

// Routes
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(globalErrorHandlingMiddleware);

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port: ${port}`));