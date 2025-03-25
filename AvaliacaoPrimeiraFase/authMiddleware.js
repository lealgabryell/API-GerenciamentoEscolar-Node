const jwtService = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const path = req.path;
  const method = req.method;
  const nonSecurePaths = ["/api/professor", "/api/aluno", "/api/perfil"];
  let token = req.headers.authorization;

  if (
    (nonSecurePaths.includes(path) && method == "POST") ||
    (nonSecurePaths.includes(path) && method == "GET") ||
    (nonSecurePaths.includes(path) && method == "PUT") ||
    (nonSecurePaths.includes(path) && method == "DELETE") ||
    (path.includes("/api/tarefa") && method == "GET") ||
    (path.includes("/api/professor/login") && method == "POST")
  ) {
    return next();
  } else if (!token) {
    return res.status(401).json({ message: "Token não informado" });
  } else {
    token = token.split(" ")[1];
  }

  try {
    const result = jwtService.verify(token, process.env.SECRET);

    if (result) {
      return next();
    }
  } catch (e) {
    return res.status(401).json({ message: e.message, content: e });
  }
};
