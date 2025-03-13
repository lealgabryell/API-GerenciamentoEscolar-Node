
const criarDisciplina = async (req, res) => {
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

  res.json({
    message: "Disciplina criada com sucesso!",
    disciplina: novaDisciplina,
  });
};

const obterTodasDisciplinas = async (req, res) => {
  const disciplinas = await Disciplina.find().populate('tarefas');
  res.json(disciplinas);
};

const deletarDisciplina = async (req, res) => {
  const { id } = req.params;

  await Disciplina.deleteOne({ _id: id });
  res.json({ message: "Disciplina removida com sucesso!" });
};

const editarDisciplina = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

  let disciplina = await Disciplina.findByIdAndUpdate(id, { nome, descricao, dataInicio, dataFim, tarefas: tarefasIds });
  res.status(200).json({
    message: "Disciplina atualizada com sucesso!",
    disciplina,
  });
};

