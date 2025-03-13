let mongoose = require("mongoose");
const Aluno = require("../models/aluno.js");

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: Boolean,
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Aluno,
  },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }],
});

module.exports = mongoose.model("Tarefa", tarefaSchema);