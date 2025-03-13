const Aluno = require('../models/aluno');

module.exports = {
  criarAluno: async (req, res) => {
    try {
      const { nome, idade } = req.body;

      if (!nome || !idade) {
        throw new Error("Nome e idade são obrigatórios");
      } else {
        const novoAluno = new Aluno({
          nome,
          idade,
        });

        await novoAluno.save();

        res.json({
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
      const alunos = await Aluno.find().populate('perfil');
      if (!alunos) {
        throw new Error('Erro ao buscar alunos');
      } else {
        res.json(alunos);
      }
    } catch (e) {
      res.status(400).json({
        message: 'Erro ao buscar alunos',
        error: e.message,
      });
    }
  },

  deletarAluno: async (req, res) => {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findById({ id });
      if (!id || !aluno) {
        throw new Error('Id invalido');
      } else {
        await Aluno.deleteOne({ _id: id });
        res.json({ message: 'Aluno removido com sucesso!' });
      }
    } catch (e) {
      res.status(400).json({
        message: 'Erro ao deletar aluno',
        error: e.message,
      });
    }
  },
  editarAluno: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, idade } = req.body;

      let aluno = await Aluno.findOne(id);
      if (!aluno) {
        throw new Error('Aluno nao encontrado!');
      } else {
        const alunoAtualizado = await Aluno.findByIdAndUpdate(id, { nome, idade });
        res.status(200).json({
          message: 'Aluno atualizado com sucesso!',
          aluno: alunoAtualizado,
        });
      }
    } catch (e) {
      res.status(400).json({
        message: 'Erro ao atualizar aluno',
        error: e.message,
      });
    }
  }
}
