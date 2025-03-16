const Aluno = require("../models/aluno");
const perfil = require("../models/perfil");

module.exports = {
  criarAluno: async (req, res) => {
    try {
      const { nome, idade } = req.body;

      if (!nome || !idade) {
        throw new Error("Nome e idade são obrigatórios");
      } else {
        const novoAluno = {
          nome,
          idade,
        };

        await Aluno.create(novoAluno);

        res.status(201).json({
          message: "Aluno criado com sucesso!",
          aluno: novoAluno,
        });
      }
    } catch (e) {
      res.status(400).json({
        message: "Erro ao criar aluno",
        error: e.message,
      });
    }
  },
  obterTodosAlunos: async (req, res) => {
    try {
      const alunos = await Aluno.find().populate("perfil");

      if (!alunos) {
        throw new Error("Erro ao buscar alunos");
      } else {
        res.status(200).json({
          alunosEncontrados: alunos.map(({ _id, nome, idade, perfil }) => ({
            _id,
            nome,
            idade,
            perfil: perfil
              ? {
                  matricula: perfil.matricula,
                  telefone: perfil.telefone,
                  endereco: perfil.endereco,
                }
              : "Aluno sem perfil",
          })),
        });
      }
    } catch (e) {
      res.status(400).json({
        message: "Erro ao buscar alunos",
        error: e.message,
      });
    }
  },
  deletarAluno: async (req, res) => {
    try {
      const id = req.params.id;
      const aluno = await Aluno.findById(id);
      if (!aluno) {
        throw new Error("Id invalido");
      } else {
        await Aluno.findByIdAndDelete(aluno);
        res.status(201).json({ message: "Aluno removido com sucesso!" });
      }
    } catch (e) {
      res.status(400).json({
        message: "Erro ao deletar aluno",
        error: e.message,
      });
    }
  },
  editarAluno: async (req, res) => {
    try {
      const id = req.params.id;
      const { nome, idade } = req.body;

      let aluno = await Aluno.findById(id);
      if (!aluno) {
        throw new Error("Aluno nao encontrado!");
      } else {
        await Aluno.findByIdAndUpdate(id, {
          nome,
          idade,
        });
        res.status(201).json({
          message: "Aluno atualizado com sucesso!",
          aluno: { nome, idade },
        });
      }
    } catch (e) {
      res.status(400).json({
        message: "Erro ao atualizar aluno",
        error: e.message,
      });
    }
  },
};
