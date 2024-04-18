// Import necessary modules
const express = require('express');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/dbConfig.js');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Define function to establish database connection
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,{
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,

      pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          idle: dbConfig.pool.idle,
          acquire: dbConfig.pool.acquire
      }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
