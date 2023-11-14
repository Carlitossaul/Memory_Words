const { Router } = require("express");
const router = Router();

//handler bulk
const { bulkCreateHandler } = require("../handlers/handleBulk");

// handlers words
const {
  postWordHandler,
  deleteWordHandler,
  updateColorWordHandler,
} = require("../handlers/handleWord");

//handlers sections
const {
  deleteSeccionHandler,
  postSeccionHandler,
  getSeccionsHandler,
} = require("../handlers/handleSeccion");

//handlers user
const { loginUserHandler, postUserHandler } = require("../handlers/handleUser");

//user
router.post("/login", loginUserHandler);
router.post("/user", postUserHandler);

//seccions
router.post("/seccion", postSeccionHandler);
router.get("/seccion", getSeccionsHandler);
router.delete("/seccion/:id", deleteSeccionHandler);

//words
router.post("/words", postWordHandler);
router.delete("/words/:id", deleteWordHandler);
router.put("/words", updateColorWordHandler);

//bulk
router.post("/bulk", bulkCreateHandler);

module.exports = router;
