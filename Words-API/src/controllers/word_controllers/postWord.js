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

    //tengo que retornar el mensaje pero tambien la lista actualizada de palabras

    const sections = await Seccion.findAll({
      where: { UserId: idUser },
      include: [{ model: Word }],
    });

    return sections;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = postWord;
