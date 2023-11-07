const { Word } = require("../db");
const { Seccion } = require("../db.js");

const postWord = async (req, res) => {
  const { englishWord, spanishWord, color, nameSeccion, idUser, idSeccion } =
    req.body;
  console.log("data", englishWord, spanishWord, color, idUser, idSeccion);
  try {
    const existingWord = await Word.findOne({
      where: {
        key: englishWord,
        value: spanishWord,
        color: color,
        SeccionId: { $not: null }, // Verifica se já está associada a uma seção
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

    // res.status(200).json({ message: "word created successfully!" });
    res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

const deleteWord = async (req, res) => {
  const { id } = req.params; // Obtém o id da palavra da rota

  try {
    // Verifique se a palavra existe no banco de dados
    const word = await Word.findOne({ where: { id } });

    if (!word) {
      return res.status(404).json({ message: "Palavra não encontrada." });
    }

    // Exclua a palavra do banco de dados
    await Word.destroy({ where: { id } });

    // Retorne uma mensagem de sucesso
    return res.status(200).json({ message: "Palavra excluída com sucesso." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postWord, deleteWord, updateWord };
