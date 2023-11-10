const { Word } = require("../db");
const { Seccion } = require("../db.js");
const { wordsArray } = require("../data/data.js");

const bulkCreate = async (req, res) => {
  const { idUser, nameSeccion } = req.body;

  try {
    const existing = await Seccion.findOne({
      where: { name: nameSeccion, UserId: idUser },
    });

    if (existing) {
      // console.log(existing);
      return res.status(406).json({ message: "Section existing" });
    }

    // Si la sección no existe, crear una nueva sección y asociar las palabras
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

    res.status(200).json({
      message: "Sección y palabras creadas exitosamente.",
      sections: updatedSections,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { bulkCreate };
