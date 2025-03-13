
const criarAluno = async (req, res) => {
  const { nome, idade } = req.body;

  const novoAluno = new Aluno({
    nome,
    idade,
  });

  await novoAluno.save();

  res.json({
    message: "Aluno criado com sucesso!",
    aluno: novoAluno,
  });
};

const obterTodosAlunos = async (req, res) => {
  const alunos = await Aluno.find().populate('perfil');
  res.json(alunos);
};

const deletarAluno = async (req, res) => {
  const { id } = req.params;

  await Aluno.deleteOne({ _id: id });
  res.json({ message: 'Aluno removido com sucesso!' });
};

const editarAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;

  let aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });
  res.status(200).json({
    message: 'Aluno atualizado com sucesso!',
    aluno,
  });
};

