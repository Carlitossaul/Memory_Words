const { Router } = require("express");

const { postSeccion, getSeccions } = require("../handlers/handleSeccion");
const { bulkCreate } = require("../handlers/handleBulk");

// handlers words
const {
  postWordHandler,
  deleteWordHandler,
  updateColorWordHandler,
} = require("../handlers/handleWord");

//handlers sections
const { deleteSeccionHandler } = require("../handlers/handleSeccion");

//handlers user
const { loginUserHandler, postUserHandler } = require("../handlers/handleUser");

const router = Router();

//user
router.post("/login", loginUserHandler);
router.post("/user", postUserHandler);

//seccions
router.post("/seccion", postSeccion);
router.get("/seccion", getSeccions);
router.delete("/seccion/:id", deleteSeccionHandler);

//words
router.post("/words", postWordHandler);
router.delete("/words/:id", deleteWordHandler);
router.put("/words", updateColorWordHandler);

//bulk
router.post("/bulk", bulkCreate);

module.exports = router;
