const Professor = require("../models/Professor");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtService = require("jsonwebtoken");

const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, email, senha, disciplinasIds } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      email,
      senha,
      disciplinas: disciplinasIds,
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
    const { id } = req.params.id;
    const { nome, idade, email, disciplinasIds } = req.body;
    const professor = await Professor.findById(id);
    if (!professor) {
      throw new Error("Professor não encontrado");
    } else {
      let professorAtualizado = await Professor.findByIdAndUpdate(id, {
        nome,
        idade,
        email,
        disciplinas: disciplinasIds,
      });
      res.status(201).json({
        message: "Professor atualizado com sucesso!",
        professor,
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Erro ao atualizar professor",
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
        expiresIn: "1h",
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
  deletarProfessor,
  editarProfessor,
  login,
};
