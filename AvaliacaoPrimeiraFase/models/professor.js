let mongoose = require("mongoose");

let professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  email: {type: String, required: true},
  senha: {type: String, required: true},
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }],
});

module.exports = mongoose.model("Professor", professorSchema);