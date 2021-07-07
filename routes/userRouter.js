express = require('express');
const router = express.Router();

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

const stub = function (req, res) {
  res
    .status(500)
    .json({
      status: 'error',
      message: 'route not implemented'
    });
}

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;