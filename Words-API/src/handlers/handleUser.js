const { User } = require("../db.js");

const postUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email, password },
    });

    return res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  // el login del usuario va a retornar un objeto con un true y su idUSer para poder crear seccions
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    if (user.password === password) {
      return res.status(200).json({ access: true, id: user.id });
    } else {
      return res.status(403).json({ message: "Contraseña incorrecta." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postUser, loginUser };
