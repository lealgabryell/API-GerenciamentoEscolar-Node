
const criarProfessor = async (req, res) => {
  const { nome, idade, disciplinasIds } = req.body;

  const novoProfessor = new Professor({
    nome,
    idade,
    disciplinas: disciplinasIds
  });

  await novoProfessor.save();

  res.json({
    message: "Professor criado com sucesso!",
    professor: novoProfessor,
  });
};

const obterTodosProfessores = async (req, res) => {
  const professores = await Professor.find().populate('disciplinas');
  res.json(professores);
};

const deletarProfessor = async (req, res) => {
  const { id } = req.params;

  await Professor.deleteOne({ _id: id });
  res.json({ message: "Professor removido com sucesso!" });
};

const editarProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, disciplinasIds } = req.body;

  let professor = await Professor.findByIdAndUpdate(id, { nome, idade, disciplinas: disciplinasIds });
  res.status(200).json({
    message: "Professor atualizado com sucesso!",
    professor,
  });
};

