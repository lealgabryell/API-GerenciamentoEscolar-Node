const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController.js");

router.get("/perfil", perfilController.obterTodosPerfis);
router.post("/perfil", perfilController.criarPerfil);
router.delete("/perfil/:id", perfilController.deletarPerfil);
router.put("/perfil/:id", perfilController.editarPerfil);

module.exports = router;