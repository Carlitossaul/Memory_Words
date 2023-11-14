const bulkWords = require("../controllers/bulk_controllers/bulkWords");

const bulkCreateHandler = async (req, res) => {
  const { idUser, nameSeccion } = req.body;

  try {
    const sections = await bulkWords(idUser, nameSeccion);
    return res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { bulkCreateHandler };
