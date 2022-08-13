const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

app.use(errorHandler);

module.exports = app;
