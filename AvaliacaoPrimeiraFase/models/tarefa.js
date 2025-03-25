let mongoose = require("mongoose");
const Aluno = require("../models/aluno.js");

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: Boolean,
  turma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turma",
  },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }],
});

module.exports = mongoose.model("Tarefa", tarefaSchema);