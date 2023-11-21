const { Word } = require("../../db.js");
const { Seccion } = require("../../db.js");

//function for post words
const postWord = async (
  englishWord,
  spanishWord,
  color,
  nameSeccion,
  idUser
) => {
  try {
    const existingWord = await Word.findOne({
      where: {
        key: englishWord,
        value: spanishWord,
        color: color,
        SeccionId: { $not: null },
      },
    });

    if (existingWord) {
      return res
        .status(400)
        .json({ message: "A palavra já existe nesta seção." });
    }

    const newWord = await Word.create({
      key: englishWord,
      value: spanishWord,
      color: color,
    });

    const seccion = await Seccion.findOne({
      where: { name: nameSeccion, UserId: idUser },
    });

    await seccion.addWord(newWord);

    const sections = await Seccion.findAll({
      where: { UserId: idUser },
      include: [{ model: Word }],
    });

    return { data: sections, message: "word add successfully" };
  } catch (error) {
    return error;
  }
};

module.exports = postWord;
