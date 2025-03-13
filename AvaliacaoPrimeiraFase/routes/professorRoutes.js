const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController.js");

router.get("/professor", professorController.obterTodosProfessores);
router.post("/professor", professorController.criarProfessor);
router.delete("/professor/:id", professorController.deletarProfessor);
router.put("/professor/:id", professorController.editarProfessor);

module.exports = router;