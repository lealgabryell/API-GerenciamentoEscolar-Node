let mongoose = require("mongoose");

let alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true, min: 15, max: 99 },
  perfil: { type: mongoose.Schema.Types.ObjectId, ref: "Perfil" },
});

module.exports = mongoose.model("Aluno", alunoSchema);


//1 pra 1: referencia nas duas pontas sem array
//muitos pra muitos: tem referencia nas duas pontas com array
//muitos pra 1: tem referencia no lado muitos e nao com array
//1 pra muitos: tem referencia no lado 1 e com array


//Aluno - Perfil -> 1:1
//Tarefa - Disciplina -> n:n
//Tarefa - Disciplina -> n:n
//Professor - Disciplina -> 1:n
//Turma - Aluno -> 1:n
//Turma - Professor -> n:1
