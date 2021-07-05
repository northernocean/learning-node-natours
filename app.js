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

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: { tours }
    });
});

// To test with curl: curl -X POST -d "$(<foo.json)" -H 'Content-type: application/json' 127.0.0.1:3000/api/v1/tours
app.post('/api/v1/tours', (req, res) => {
  if (req) {
    id = tours.map(c => c.id).sort((a, b) => a - b)[tours.length - 1] + 1;
    newTour = Object.assign({"id": id}, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      err => { 
        if(err){
          res
            .status(500)
            .json({"status": "error", "message": "internal error: unable to save data"})
        }
        else{
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

