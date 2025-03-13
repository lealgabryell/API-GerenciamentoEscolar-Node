let mongoose = require("mongoose");

let turmaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aluno" }],
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" }
});

module.exports = mongoose.model("Turma", turmaSchema);