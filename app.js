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

// To test with curl: curl 127.0.0.1:3000/api/v1/tours
//                    curl -X POST -d "$(<foo.json)" -H 'Content-type: application/json' 127.0.0.1:3000/api/v1/tours

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: { tours }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find(c => c.id == +req.params.id)
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

// --------------
// Go Express App
// --------------

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

