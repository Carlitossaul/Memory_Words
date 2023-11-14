const { Seccion } = require("../../db");
const { Word } = require("../../db");

const deleteSeccion = async (id) => {
  const seccion = await Seccion.findByPk(id, { include: Word });

  for (let i = 0; i < seccion.Words.length; i++) {
    await seccion.Words[i].destroy();
  }

  await seccion.destroy();

  return "Seccion deleted";
};

module.exports = deleteSeccion;
