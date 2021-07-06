const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

// ----------
// Middleware
// ----------

// Request logging
app.use(morgan('dev'));

// Middleware for receiving JSON data in requests
app.use(express.json());

// Custom middleware functions
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const PORT = process.env.PORT || 3000;

// ------
// Routes
// ------

const getAllTours = function (req, res) {
  res
    .status(200)
    .json({
      status: 'success',
      data: { tours }
    });
};

const getTour = function (req, res) {
  console.log(req.requestTime);
  const tour = tours.find(c => +c.id == +req.params.id)
  if (tour) {
    res
      .status(200)
      .json({
        status: 'success',
        data: { tour }
      });
  }
  else {
    res
      .status(400)
      .json({
        status: 'error'
      })
  }
};

const deleteTour = function (req, res) {
  const tour = tours.find(c => c.id == +req.params.id)
  if (tour) {
    console.log('Deleting tour!');
    res
      .status(200)
      .json({
        status: 'success',
        data: null
      });
  }
  else {
    res
      .status(400)
      .json({
        status: 'error'
      })
  }
};

const updateTour = function (req, res) {
  const tour = tours.find(c => c.id == +req.params.id);
  if (tour) {
    console.log("...doing patch updates!");
    res
      .status(200)
      .json(tour);
  }
  else {
    res
      .status(400)
      .json({
        status: 'error'
      })
  }
};

const createTour = function (req, res) {
  if (req) {
    id = tours.map(c => c.id).sort((a, b) => a - b)[tours.length - 1] + 1;
    newTour = Object.assign({ "id": id }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      err => {
        if (err) {
          res
            .status(500)
            .json({ "status": "error", "message": "internal error: unable to save data" })
        }
        else {
          res
            .status(201)
            .json({
              "status": "success",
              "data": newTour
            });
        }
      })
  }
};

const getAllUsers = function (req, res) {
  stub(req, res);
}

const createUser = function (req, res) {
  stub(req, res);
}

const getUser = function (req, res) {
  stub(req, res);
}

const updateUser = function (req, res) {
  stub(req, res);
}

const deleteUser = function (req, res) {
  stub(req, res);
}

const stub = function(req, res) {
  res
    .status(500)
    .json({
      status: 'error',
      message: 'route not implemented'
    });
}

// Tours resource routing
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Users resource routing
const userRouter = express.Router();
app.use('/api/v1/users', userRouter);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// --------------
// Go Express App
// --------------

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
