const { Word } = require("../../db");
const { Seccion } = require("../../db.js");
const { wordsArray } = require("../../data/data.js");

const bulkWords = async (idUser, nameSeccion) => {
  const existing = await Seccion.findOne({
    where: { name: nameSeccion, UserId: idUser },
  });

  if (existing) {
    return { message: "Section existing" };
  }

  // Si la sección no existe, crear una nueva sección
  const newSection = await Seccion.create({
    name: nameSeccion,
    UserId: idUser,
  });

  // Crear las palabras y asociarlas a la nueva sección
  const createdWords = await Word.bulkCreate(
    wordsArray.map((word) => ({
      key: word.key,
      value: word.value,
      color: word.color,
      SeccionId: newSection.id,
    }))
  );

  // Agregar las palabras a la nueva sección
  await newSection.addWords(createdWords);

  // Obtener la lista actualizada de secciones con palabras asociadas
  const updatedSections = await Seccion.findAll({
    where: { UserId: idUser },
    include: [{ model: Word }],
  });

  return {
    message: "Section created successfully.",
    sections: updatedSections,
  };
};

module.exports = bulkWords;
