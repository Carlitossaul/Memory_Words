const { Seccion } = require("../db.js");
const { User } = require("../db.js");
const { Word } = require("../db.js");

const postSeccion = async (req, res) => {
  const { name, idUser } = req.body;
  console.log(name, idUser);

  const id = Number(idUser);
  console.log(typeof id);

  try {
    const [section, created] = await Seccion.findOrCreate({
      where: { name, UserId: idUser },
    });
    const user = await User.findOne({
      where: { id: id },
    });

    await user.addSeccion(section);

    const sections = await Seccion.findAll({
      where: { UserId: idUser },
      include: [{ model: Word }],
    });
    return res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSeccions = async (req, res) => {
  // va a buscar todas las seccions relacionadas al idUser y las retornara.
  //va a retornar esto se va a mapear en el front, cada seccon con sus palabras relacionadas o los nombres simplemente.
  //si me manda un nombre mando todas las palabras relacionadas a ese nombre
  const { name, idUser } = req.query;
  console.log(name, idUser);
  try {
    if (!name) {
      const seccion = await Seccion.findAll({
        where: { UserId: idUser },
        include: [{ model: Word }],
      });
      return res.status(200).json(seccion);
    } else {
      const seccion = await Seccion.findOne({
        where: { name: name, UserId: idUser },
        include: [{ model: Word }],
      });
      return res.status(200).json(seccion);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postSeccion, getSeccions };
