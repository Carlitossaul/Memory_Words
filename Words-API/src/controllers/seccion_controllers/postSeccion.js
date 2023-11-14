const { Seccion } = require("../../db.js");
const { User } = require("../../db.js");
const { Word } = require("../../db.js");

const postSeccion = async (name, idUser) => {
  const id = Number(idUser);

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

  return sections;
};

module.exports = postSeccion;
