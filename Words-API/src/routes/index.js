const { Router } = require("express");

const { postUser, loginUser } = require("../handlers/handleUser");
const { postSeccion, getSeccions } = require("../handlers/handleSeccion");
const { bulkCreate } = require("../handlers/handleBulk");

// handler
const {
  postWordHandler,
  deleteWordHandler,
} = require("../handlers/handleWord");
const { deleteSeccionHandler } = require("../handlers/handleSeccion");

const router = Router();

//user
router.post("/login", loginUser);
router.post("/user", postUser);

//seccions
router.post("/seccion", postSeccion);
router.get("/seccion", getSeccions);
router.delete("/seccion/:id", deleteSeccionHandler);

//words
router.post("/words", postWordHandler);
router.delete("/words/:id", deleteWordHandler);
// router.put("/words", updateWord);

//bulk
router.post("/bulk", bulkCreate);

module.exports = router;
