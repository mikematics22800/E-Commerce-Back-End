const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance to connect to the e-commerce database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost', // Database host
  dialect: 'postgres', // Database dialect
});

const app = express(); // Initialize express app
const PORT = process.env.PORT || 3001; // Set the port to the environment variable or default to 3001

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(routes); // Use the routes defined in routes folder

// Test the database connection and then start the server
sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`); // Start the server and listen on the specified port
});