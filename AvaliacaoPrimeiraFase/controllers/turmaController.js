const Turma = require("../models/turma");

const criarTurma = async (req, res) => {
  try {
    const { nome, alunosIds, professorId } = req.body;

    if (!nome || !alunosIds || alunosIds.length === 0 || !professorId) {
      throw new Error("Campos obrigatórios não preenchidos");
    } else {
      const novaTurma = new Turma({
        nome,
        alunos: alunosIds,
        professor: professorId,
      });

      await novaTurma.save();

      res.status(201).json({
        message: "Turma criada com sucesso!",
        turma: novaTurma,
      });
    }
  } catch (e) {
    res.status(400).json({ message: "Erro ao criar turma", error: e.message });
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate("alunos professor");
    if (turmas.length === 0) {
      throw new Error("Nenhuma turma encontrada");
    } else {
      res.status(200).json(turmas);
    }
  } catch (e) {
    res
      .status(404)
      .json({ message: "Erro ao buscar turmas", error: e.message });
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      throw new Error("Nenhum Id informado");
    } else {
      await Turma.deleteOne({ _id: id });
      res.status(201).json({ message: "Turma removida com sucesso!" });
    }
  } catch (e) {
    res
      .status(404)
      .json({ message: "Erro ao deletar turma", error: e.message });
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { nome, alunosIds, professorId } = req.body;
    const turma = await Turma.findById(id);
    if (!id || !nome || !alunosIds || alunosIds.length === 0 || !professorId) {
      throw new Error("Parametros obrigatórios não preenchidos");
    } else if (!turma) {
      throw new Error("Turma não encontrada");
    } else {
      let turmaAtualizada = await Turma.findByIdAndUpdate(id, {
        nome,
        alunos: alunosIds,
        professor: professorId,
      });
      res.status(201).json({
        message: "Turma atualizada com sucesso!",
        turmaAtualizada,
      });
    }
  } catch (e) {
    res
      .status(404)
      .json({ message: "Erro ao atualizar turma", error: e.message });
  }
};

module.exports = { criarTurma, obterTodasTurmas, deletarTurma, editarTurma };
