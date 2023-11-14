const { Seccion } = require("../../db.js");
const { Word } = require("../../db.js");

const getSeccions = async (name, idUser) => {
  if (!name) {
    const seccion = await Seccion.findAll({
      where: { UserId: idUser },
      include: [{ model: Word }],
    });
    return seccion;
  } else {
    const seccion = await Seccion.findOne({
      where: { name: name, UserId: idUser },
      include: [{ model: Word }],
    });
    return seccion;
  }
};

module.exports = getSeccions;
