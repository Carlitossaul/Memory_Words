const { Router } = require("express");

const { postUser, loginUser } = require("../handlers/handleUser");
const { postSeccion, getSeccions } = require("../handlers/handleSeccion");
const { postWord, updateWord, deleteWord } = require("../handlers/handleWord");
const { bulkCreate } = require("../handlers/handleBulk");

const router = Router();

//user
router.post("/login", loginUser);
router.post("/user", postUser);

//seccions
router.post("/seccion", postSeccion);
router.get("/seccion", getSeccions);

//words
router.post("/words", postWord);
router.delete("/words/:id", deleteWord);
router.put("/words", updateWord);

//bulk
router.post("/bulk", bulkCreate);

module.exports = router;
