

const criarTurma = async (req, res) => {
  const { nome, alunosIds, professorId } = req.body;

  const novaTurma = new Turma({
    nome,
    alunos: alunosIds,
    professor: professorId,
  });

  await novaTurma.save();

  res.json({
    message: "Turma criada com sucesso!",
    turma: novaTurma,
  });
};

const obterTodasTurmas = async (req, res) => {
  const turmas = await Turma.find().populate('alunos professor');
  res.json(turmas);
};

const deletarTurma = async (req, res) => {
  const { id } = req.params;

  await Turma.deleteOne({ _id: id });
  res.json({ message: "Turma removida com sucesso!" });
};

const editarTurma = async (req, res) => {
  const { id } = req.params;
  const { nome, alunosIds, professorId } = req.body;

  let turma = await Turma.findByIdAndUpdate(id, { nome, alunos: alunosIds, professor: professorId });
  res.status(200).json({
    message: "Turma atualizada com sucesso!",
    turma,
  });
};

