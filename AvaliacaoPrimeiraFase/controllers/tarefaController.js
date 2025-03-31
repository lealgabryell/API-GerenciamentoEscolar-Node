const Tarefa = require("../models/tarefa");
const Disciplina = require("../models/disciplina");
const Turma = require("../models/turma");

const criarTarefa = async (req, res) => {
  try {
    const { titulo, turmasIds, disciplinasIds } = req.body;
    if (!titulo || !turmasIds || !disciplinasIds || disciplinasIds.length === 0) {
      throw new Error("Campos obrigatórios não preenchidos");
    } else {
      const concluida = false;

      const novaTarefa = new Tarefa({
        titulo,
        turmas: turmasIds,
        concluida,
        disciplinas: disciplinasIds,
      });
      await Disciplina.updateMany(
        { _id: { $in: disciplinasIds } },
        { $push: { tarefas: novaTarefa._id } }
      );
      await Turma.updateMany(
        { _id: { $in: turmasIds } },
        { $push: { tarefas: novaTarefa._id } }
      );
      await novaTarefa.save();

      res.status(201).json({
        message: "Tarefa criada com sucesso!",
        tarefa: novaTarefa,
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
};

const obterTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find()
      .populate("disciplinas")
      .populate("turmas")
    res.status(200).json(tarefas);
  } catch (e) {
    res.status(500).json({ message: "Erro ao obter tarefa" });
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Nenhum Id informado");
    } else {
      await Tarefa.deleteOne({ _id: id });
      res.status(201).json({ message: "Tarefa removida com sucesso!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao deletar tarefa" });
  }
};

const editarTarefa = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, concluida, turmasIds, disciplinasIds } = req.body;
    const tarefa = await Tarefa.findById(id);
    if (!id || !titulo || !concluida || !turmasIds || !disciplinasIds) {
      throw new Error("Campos obrigatórios não preenchidos");
    } else if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    } else {
      let tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, {
        titulo,
        concluida,
        turmas: turmasIds,
        disciplinas: disciplinasIds
      });
      await Disciplina.updateMany(
        { _id: { $in: disciplinasIds } },
        { $push: { tarefas: tarefaAtualizada._id } }
      );
      res.status(201).json({
        message: "Tarefa atualizada com sucesso!",
        tarefaAtualizada,
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao editar tarefa" });
  }
};

const obterTarefaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const tarefa = await Tarefa.findById(id)
      .populate("disciplinas")
      .populate("turmas")
    if (!id) {
      throw new Error("Id inválido!");
    } else if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    } else {
      res.status(200).json(tarefa)
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  criarTarefa,
  obterTodasTarefas,
  deletarTarefa,
  editarTarefa,
  obterTarefaPorId
};
