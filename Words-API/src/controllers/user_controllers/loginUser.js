const { User } = require("../../db");

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return "user not found";
    }

    // Compara la contraseña usando bcrypt
    // const passwordMatch = await bcrypt.compare(password, user.password);
    if (user.password === password) {
      return {
        access: true,
        id: user.id,
      };
    }

    return "password incorrect";
  } catch (error) {
    return error;
  }
};

module.exports = loginUser;
