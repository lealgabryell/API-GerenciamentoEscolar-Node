

const criarPerfil = async (req, res) => {
  const { matricula, telefone, endereco, alunoId } = req.body;

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

  res.json({
    message: "Perfil criado com sucesso!",
    perfil: novoPerfil,
  });
};

const obterTodosPerfis = async (req, res) => {
  const perfis = await Perfil.find().populate('aluno');
  res.json(perfis);
};

const deletarPerfil = async (req, res) => {
  const { id } = req.params;

  await Perfil.deleteOne({ _id: id });
  res.json({ message: "Perfil removido com sucesso!" });
};

const editarPerfil = async (req, res) => {
  const { id } = req.params;
  const { matricula, telefone, endereco, alunoId } = req.body;

  let perfil = await Perfil.findByIdAndUpdate(id, { matricula, telefone, endereco, aluno: alunoId });
  res.status(200).json({
    message: "Perfil atualizado com sucesso!",
    perfil,
  });
};

