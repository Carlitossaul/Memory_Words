const { Word } = require("../../db.js");
const { Seccion } = require("../../db.js");

const updateColorWord = async (englishWord, color, idSeccion, id, idUser) => {
  try {
    const word = await Word.findOne({
      where: { key: englishWord, SeccionId: idSeccion, id: id },
    });

    if (word) {
      await word.update({
        color: color,
      });

      const sections = await Seccion.findAll({
        where: { UserId: idUser },
        include: [{ model: Word }],
      });

      return sections;
    }
  } catch (error) {
    return error;
  }
};

module.exports = updateColorWord;
