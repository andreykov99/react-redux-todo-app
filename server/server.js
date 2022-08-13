const dotenv = require('dotenv').config();
const colors = require('colors');
const app = require('./app');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

app.listen(port, console.log(`Server running on port ${port}`.green.bold));
