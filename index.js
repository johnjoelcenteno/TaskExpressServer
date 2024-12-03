const express = require('express');
const app = express();
const cors = require('cors');

// Enable JSON parsing
app.use(express.json());

// CORS Configuration
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true, // Allow cookies to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],
    })
);

// Middlewares
const { NormalizeRequestBody } = require('./src/middlewares/NormalizeRequestBodyProperties');
const { globalErrorHandlingMiddleware } = require('./src/middlewares/globalErrorHandling.middleware');
const { RouteNotFoundMiddleware } = require('./src/middlewares/RouteNotFound.middleware');

// Transform request body properties to cammel case
app.use(NormalizeRequestBody);

// Routes
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const userRoutes = require('./src/routes/user.routes');
const categoryRoutes = require('./src/routes/category.routes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);

// Error-handling middlewares
app.use(globalErrorHandlingMiddleware);
app.use(RouteNotFoundMiddleware);

// Start the server
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port: ${port}`));
