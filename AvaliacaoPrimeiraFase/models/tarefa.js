let mongoose = require("mongoose");

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: Boolean,
  turmas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turma",
  }],
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }],
});

module.exports = mongoose.model("Tarefa", tarefaSchema);