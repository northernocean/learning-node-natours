const getAllUsers = function (req, res) {
  stub(req, res);
}

const getUser = function (req, res) {
  stub(req, res);
}

const createUser = function (req, res) {
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

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}