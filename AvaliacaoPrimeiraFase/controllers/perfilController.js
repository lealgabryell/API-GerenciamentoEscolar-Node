const Aluno = require("../models/aluno");
const Perfil = require("../models/perfil");
const { v4: uuidv4 } = require("uuid");

const genearetMatricula = () => {
  return `m-${uuidv4()}`;
};

module.exports = {
  criarPerfil: async (req, res) => {
    try {
      const { telefone, endereco, alunoId } = req.body;
      const matricula = genearetMatricula();
      const novoPerfil = new Perfil({
        matricula,
        telefone,
        endereco,
        aluno: alunoId,
      });

      await novoPerfil.save();

      await Aluno.updateOne(
        { _id: alunoId },
        { $set: { perfil: novoPerfil._id } }
      );

      res.status(201).json({
        message: "Perfil criado com sucesso!",
        perfil: novoPerfil,
      });
    } catch (e) {
      res.status(400).json({
        message: "Erro ao criar perfil",
        error: e.message,
      });
    }
  },

  obterTodosPerfis: async (req, res) => {
    try {
      const perfis = await Perfil.find().populate("aluno");
      if (perfis.length === 0) {
        throw new Error("Nenhum perfil encontrado");
      } else {
        res.status(200).json(perfis);
      }
    } catch (e) {
      res.status(404).json({
        message: "Erro ao buscar perfis",
        error: e.message,
      });
    }
  },

  deletarPerfil: async (req, res) => {
    try {
      const id = req.params.id;
      const perfil = await Perfil.findById(id);
      if (!perfil) {
        throw new Error("Perfil não encontrado");
      } else {
        await Perfil.deleteOne({ _id: id });
        await Aluno.updateOne(
          { _id: alunoId },
          { $set: { perfil: novoPerfil._id } }
        );
        res.status(201).json({ message: "Perfil removido com sucesso!" });
      }
    } catch (e) {
      res.status(404).json({
        message: "Erro ao deletar perfil",
        error: e.message,
      });
    }
  },

  editarPerfil: async (req, res) => {
    try {
      const { id } = req.params.id;
      const { matricula, telefone, endereco, alunoId } = req.body;
      const perfil = await Perfil.findById(id);
      if (!perfil) {
        throw new Error("Perfil não encontrado");
      } else {
        let perfilAtualizado = await Perfil.findByIdAndUpdate(id, {
          matricula,
          telefone,
          endereco,
          aluno: alunoId,
        });
        res.status(201).json({
          message: "Perfil atualizado com sucesso!",
          perfil: perfilAtualizado,
        });
      }
    } catch (e) {
      res.status(404).json({
        message: "Erro ao editar perfil",
        error: e.message,
      });
    }
  },
};
