//controllers
const deleteWord = require("../controllers/word_controllers/deleteWord");
const postWord = require("../controllers/word_controllers/postWord");
const updateColorWord = require("../controllers/word_controllers/updateColorWord");

const postWordHandler = async (req, res) => {
  const { englishWord, spanishWord, color, nameSeccion, idUser, idSeccion } =
    req.body;

  try {
    const sections = await postWord(
      englishWord,
      spanishWord,
      color,
      nameSeccion,
      idUser,
      idSeccion
    );
    return res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWordHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteWord(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateColorWordHandler = async (req, res) => {
  const { englishWord, color, idSeccion, id, idUser } = req.body;

  try {
    const response = await updateColorWord(
      englishWord,
      color,
      idSeccion,
      id,
      idUser
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { postWordHandler, deleteWordHandler, updateColorWordHandler };
