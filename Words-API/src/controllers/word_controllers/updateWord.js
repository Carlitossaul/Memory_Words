const { Word } = require("../../db.js");
const { Seccion } = require("../../db.js");

const updateWord = async (req, res) => {
  const { englishWord, color, idSeccion, id, idUser } = req.body;

  try {
    const word = await Word.findOne({
      where: { key: englishWord, SeccionId: idSeccion, id: id },
    });

    if (word) {
      await word.update({
        color: color,
      });

      console.log(word);

      const sections = await Seccion.findAll({
        where: { UserId: idUser },
        include: [{ model: Word }],
      });

      res.status(200).json(sections);
    } else {
      res.status(404).send("word not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error update word");
  }
};

module.exports = updateWord;
