express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');

console.log(`file: tourRouter.js\n dir: ${__dirname}\n`);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;