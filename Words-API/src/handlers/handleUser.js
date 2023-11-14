const { User } = require("../db.js");

// constrollers
const postUser = require("../controllers/user_controllers/postUser.js");
const loginUser = require("../controllers/user_controllers/loginUser.js");

const postUserHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await postUser(email, password);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await loginUser(email, password);

    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

module.exports = { postUserHandler, loginUserHandler };
