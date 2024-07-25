const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Initialize express app
const PORT = process.env.PORT || 3001; // Set the port to the environment variable or default to 3001

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(routes); // Use the routes defined in routes folder

// Test the database connection, sync models, and then start the server
sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}.`); // Start the server and listen on the specified port
  });
}).catch((err) => {
  console.error('Unable to connect to the database or sync models:', err); 
});