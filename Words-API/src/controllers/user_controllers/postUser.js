const { User } = require("../../db.js");

const postUser = async (email, password) => {
  const [user, created] = await User.findOrCreate({
    where: { email, password },
  });
  return "User created successfully!";
};

module.exports = postUser;
