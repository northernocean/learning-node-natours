const express = require('express');
const app = express();
const morgan = require('morgan');

console.log(`file: app.js\n dir: ${__dirname}\n`);

// -----------------
// Global Middleware
// -----------------

// Request logging
app.use(morgan('dev'));

// For receiving JSON data in requests
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ------------------
// Routing Middleware
// ------------------

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// --------------------------------------
// Other items for startup/initialization
// --------------------------------------

module.exports = app;