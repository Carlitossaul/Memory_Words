const { Word } = require("../../db.js");

const deleteWord = async (id) => {
  const word = await Word.findByPk(id);

  if (!word) {
    return "word not found";
  }

  await word.destroy();

  return "word deleted";
};

module.exports = deleteWord;
