const Professor = require("../models/professor");
const Turma = require("../models/turma");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtService = require("jsonwebtoken");

const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, email, senha } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      email,
      senha
    });

    novoProfessor.senha = await bcrypt.hash(
      novoProfessor.senha,
      Number(process.env.ROUNDS)
    );

    await novoProfessor.save();

    res.status(201).json({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (e) {
    res.status(400).json({
      message: "Erro ao criar professor",
      error: e.message,
    });
  }
};

const obterTodosProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate("disciplinas");
    if (professores.length === 0) {
      throw new Error("Nenhum professor encontrado");
    } else {
      res.status(200).json(professores);
    }
  } catch (e) {
    res.status(404).json({
      message: "Erro ao buscar professores",
      error: e.message,
    });
  }
};

const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params.id;

    await Professor.deleteOne({ _id: id });
    res.status(201).json({ message: "Professor removido com sucesso!" });
  } catch (e) {
    res.status(404).json({
      message: "Erro ao deletar professor",
      error: e.message,
    });
  }
};

const editarProfessor = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, idade, email, disciplinasIds, turmasIds } = req.body;
    const professor = await Professor.findById(id);
    if (!professor) {
      throw new Error("Professor não encontrado");
    } else {
      let professorAtualizado = await Professor.findByIdAndUpdate(id, {
        nome,
        idade,
        email,
        disciplinas: disciplinasIds,
        turmas: turmasIds,
      });
      await Turma.updateMany(
        { _id: { $in: turmasIds } },
        { $push: { professor: professorAtualizado._id } }
      );
      res.status(201).json({
        message: "Professor atualizado com sucesso!",
        professorAtualizado,
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Erro ao atualizar professor",
      error: e.message,
    });
  }
};
const obterProfessorPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const professor = await Professor.findById(id).populate("disciplinas").populate("turmas");
    if (!professor) {
      throw new Error("Professor não encontrado");
    } else {
      res.status(200).json(professor);
    }
  } catch (e) {
    res.status(404).json({
      message: "Erro ao buscar professor",
      error: e.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const professorResult = await Professor.findOne({ email: req.body.email });
    if (!professorResult) {
      throw new Error("Credenciais invalidas");
    } else {
      const { __v, _id, ...professor } = professorResult.toObject();
      if (!professor) throw new Error("Credenciais invalidas");
      const senhaIsValid = await bcrypt.compare(
        req.body.senha,
        professor.senha
      );
      if (!senhaIsValid) throw new Error("Credenciais invalidas");
      const token = jwtService.sign(professor, process.env.SECRET, {
        expiresIn: "5h",
      });

      res.status(200).json({
        message: "Login realizado com sucesso!",
        token: token,
        professor: professor,
      });
    }
  } catch (e) {
    res.status(401).json({
      message: "Erro ao realizar login",
      error: e.message,
    });
  }
};
module.exports = {
  criarProfessor,
  obterTodosProfessores,
  obterProfessorPorId,
  deletarProfessor,
  editarProfessor,
  login,
};
