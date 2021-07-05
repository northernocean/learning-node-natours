const fs = require('fs');
const express = require('express');
const app = express();

// Middleware for receiving JSON data in requests
app.use(express.json());

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
  if(tour){
    console.log("...doing patch updates!");
    res
      .status(200)
      .json(tour);
  }
  else{
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

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// --------------
// Go Express App
// --------------

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

