const Disciplina = require("../models/disciplina");
const Tarefa = require("../models/tarefa");

module.exports = {
  criarDisciplina: async (req, res) => {
    try {
      const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

      const novaDisciplina = new Disciplina({
        nome,
        descricao,
        dataInicio,
        dataFim,
        tarefas: tarefasIds,
      });

      await novaDisciplina.save();

      // Atualiza as tarefas associadas à disciplina
      await Tarefa.updateMany(
        { _id: { $in: tarefasIds } },
        { $push: { disciplinas: novaDisciplina._id } }
      );

      res.status(201).json({
        message: "Disciplina criada com sucesso!",
        disciplina: novaDisciplina,
      });
    } catch (e) {
      res.status(400).json({
        message: "Erro ao criar disciplina",
        error: e.message,
      });
    }
  },

  obterTodasDisciplinas: async (req, res) => {
    try {
      const disciplinas = await Disciplina.find().populate("tarefas");
      if (disciplinas.length === 0) {
        throw new Error("Nenhuma disciplina encontrada");
      } else {
        res.status(200).json(disciplinas);
      }
    } catch (e) {
      res.status(404).json({
        message: "Erro ao buscar disciplinas",
        error: e.message,
      });
    }
  },

  deletarDisciplina: async (req, res) => {
    try {
      const id = req.params.id;
      const disciplina = await Disciplina.findById(id);
      if (!disciplina) {
        throw new Error("Disciplina não encontrada");
      } else {
        await Disciplina.deleteOne({ _id: id });
        res.status(201).json({ message: "Disciplina removida com sucesso!" });
      }
    } catch (e) {
      res.status(404).json({
        message: "Erro ao deletar disciplina",
        error: e.message,
      });
    }
  },

  editarDisciplina: async (req, res) => {
    try {
      const id = req.params.id;
      const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;
      const disciplina = await Disciplina.findById(id);
      if (!disciplina) {
        throw new Error("Disciplina não encontrada");
      } else {
        let disciplinaAtualizada = await Disciplina.findByIdAndUpdate(id, {
          nome,
          descricao,
          dataInicio,
          dataFim,
          tarefas: tarefasIds,
        });
        await Tarefa.updateMany(
          { _id: { $in: tarefasIds } },
          { $push: { disciplinas: novaDisciplina._id } }
        );
        res.status(201).json({
          message: "Disciplina atualizada com sucesso!",
          atualizacao: disciplinaAtualizada,
        });
      }
    } catch (e) {
      res.status(404).json({
        message: "Erro ao atualizar disciplina",
        error: e.message,
      });
    }
  },
};
