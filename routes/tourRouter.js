express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// tour id must exists on any routes sending a tour id as a url param
router.param('id', (req, res, next, val) => {
  if (tourController.tourIdExistsInDb(val)) {
    next();
  }
  else {
    return res
      .status(404)
      .json({
        error: "error",
        message: "Not Found"
      });
  }
});

console.log(`file: tourRouter.js\n dir: ${__dirname}\n`);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.tourIsValidToPost, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;