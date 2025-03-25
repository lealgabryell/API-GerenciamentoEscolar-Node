let mongoose = require("mongoose");

let turmaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  turno: { type: String, required: true },
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }],
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" }
});

module.exports = mongoose.model("Turma", turmaSchema);