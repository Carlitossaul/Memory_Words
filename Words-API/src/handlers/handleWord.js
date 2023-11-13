//controllers
const deleteWord = require("../controllers/word_controllers/deleteWord");
const postWord = require("../controllers/word_controllers/postWord");

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

module.exports = { postWordHandler, deleteWordHandler };
