const Professor = require("../models/Professor");
const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, disciplinasIds } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      disciplinas: disciplinasIds
    });

    await novoProfessor.save();

    res.json({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (e) {
    res.status(400).json({
      message: "Erro ao criar professor",
      error: e.message
    });
  }
};

const obterTodosProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate('disciplinas');
    if (professores.length === 0) {
      throw new Error("Nenhum professor encontrado");
    } else {
      res.json(professores);
    }
  } catch (e) {
    res.status(404).json({
      message: "Erro ao buscar professores",
      error: e.message
    });
  }
};

const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    await Professor.deleteOne({ _id: id });
    res.json({ message: "Professor removido com sucesso!" });
  } catch (e) {
    res.status(404).json({
      message: "Erro ao deletar professor",
      error: e.message
    });
  }
};

const editarProfessor = async (req, res) => {

  try {
    const { id } = req.params;
    const { nome, idade, disciplinasIds } = req.body;
    const professor = await Professor.findById(id);
    if (!professor) {
      throw new Error("Professor não encontrado");
    } else {
      let professorAtualizado = await Professor.findByIdAndUpdate(id, { nome, idade, disciplinas: disciplinasIds });
      res.status(200).json({
        message: "Professor atualizado com sucesso!",
        professor,
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Erro ao atualizar professor",
      error: e.message
    });
  }
};
module.exports = { criarProfessor, obterTodosProfessores, deletarProfessor, editarProfessor };