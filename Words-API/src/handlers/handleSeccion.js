//controllers
const deleteSeccion = require("../controllers/seccion_controllers/deleteSeccion.js");
const postSeccion = require("../controllers/seccion_controllers/postSeccion.js");
const getSeccions = require("../controllers/seccion_controllers/getSeccion.js");

const deleteSeccionHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteSeccion(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postSeccionHandler = async (req, res) => {
  const { name, idUser } = req.body;

  try {
    const sections = await postSeccion(name, idUser);
    return res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSeccionsHandler = async (req, res) => {
  const { name, idUser } = req.query;

  try {
    const seccion = await getSeccions(name, idUser);
    return res.status(200).json(seccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteSeccionHandler,
  postSeccionHandler,
  getSeccionsHandler,
};
