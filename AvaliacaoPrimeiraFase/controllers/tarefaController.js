const Tarefa = require("../models/tarefa");

const criarTarefa = async (req, res) => {
  try {
    const { titulo, alunoId, disciplinasIds } = req.body;
    if (!titulo || !alunoId || !disciplinasIds || disciplinasIds.length === 0) {
      throw new Error("Campos obrigatórios não preenchidos");
    } else {
      const concluida = false;

      const novaTarefa = new Tarefa({
        titulo,
        aluno: alunoId,
        concluida,
        disciplinas: disciplinasIds,
      });

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
      .populate("aluno")
      .populate("disciplinas");
    if (tarefas.length === 0) {
      throw new Error("Nenhuma tarefa encontrada");
    } else {
      res.status(200).json(tarefas);
    }
  } catch (e) {
    if (e.message == "Nenhuma tarefa encontrada") {
      res.status(200).json({ message: e.message });
    } else {
      res.status(500).json({ message: "Erro ao obter tarefa" });
    }
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params.id;
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
    const { titulo, concluida } = req.body;
    const tarefa = await Tarefa.findById(id);
    if (!id || !titulo || !concluida) {
      throw new Error("Campos obrigatórios não preenchidos");
    } else if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    } else {
      let tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, {
        titulo,
        concluida,
      });
      res.status(201).json({
        message: "Tarefa atualizada com sucesso!",
        tarefaAtualizada,
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao editar tarefa" });
  }
};

module.exports = {
  criarTarefa,
  obterTodasTarefas,
  deletarTarefa,
  editarTarefa,
};
