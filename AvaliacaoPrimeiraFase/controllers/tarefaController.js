
const criarTarefa = async (req, res) => {
  const { titulo, alunoId, disciplinasIds } = req.body;
  const concluida = false;

  const novaTarefa = new Tarefa({
    titulo,
    aluno: alunoId,
    concluida,
    disciplinas: disciplinasIds,
  });

  await novaTarefa.save();

  res.json({
    message: "Tarefa criada com sucesso!",
    tarefa: novaTarefa,
  });
};

const obterTodasTarefas = async (req, res) => {
  const tarefas = await Tarefa.find().populate("aluno").populate("disciplinas");
  res.json(tarefas);
};

const deletarTarefa = async (req, res) => {
  const { id } = req.params;

  await Tarefa.deleteOne({ _id: id });
  res.json({ message: "Tarefa removida com sucesso!" });
};

const editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  let tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida });
  res.status(200).json({
    message: "Tarefa atualizada com sucesso!",
    tarefa,
  });
};

