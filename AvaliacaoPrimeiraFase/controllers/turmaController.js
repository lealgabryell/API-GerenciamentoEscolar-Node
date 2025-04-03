const Turma = require("../models/turma");

const criarTurma = async (req, res) => {
  try {
    const { nome, turno, alunosIds, tarefasIds, professorId } = req.body;

    if (!nome || !turno || !alunosIds || alunosIds.length === 0 || !professorId) {
      throw new Error("Campos obrigatórios não preenchidos");
    } else {
      const novaTurma = new Turma({
        nome,
        turno,
        alunos: alunosIds,
        tarefas: tarefasIds,
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
    const turmas = await Turma.find().populate("professor");
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
const obterTurmaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const turma = await Turma.findById(id);
    if (!id) {
      throw new Error("Id inválido!")
    } else if (!turma) {
      throw new Error("Esse id não se refere a nenhuma turma")
    } else {
      res.status(200).json({ turma: turma })
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const deletarTurma = async (req, res) => {
  try {
    const id = req.params.id;
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
    const id = req.params.id;
    const { nome, turno, alunosIds, professorId } = req.body;
    const turma = await Turma.findById(id);
    if (!id || !turno || !nome || !alunosIds || alunosIds.length === 0 || !professorId) {
      throw new Error("Parametros obrigatórios não preenchidos");
    } else if (!turma) {
      throw new Error("Turma não encontrada");
    } else {
      let turmaAtualizada = await Turma.findByIdAndUpdate(id, {
        nome,
        turno,
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

module.exports = { criarTurma, obterTodasTurmas, deletarTurma, editarTurma, obterTurmaPorId };
