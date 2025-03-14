const jwtService = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const path = req.path;
  const method = req.method;
  const nonSecurePaths = ["/api/professor/login", "/api/aluno/", "/api/perfil/"];
  let token = req.headers.autorization;

  if (
    (path.includes(nonSecurePaths) && method == "POST") ||
    method == "PUT" ||
    method == "DELETE" || method == "GET"
  ) {
    return next();
  }

  if (!token) {
    res.status(401).json({ message: "Token não informado" });
  } else {
    token = token.split(" ")[1];
  }

  try {
    const result = jwtService.verify(token, process.env.SECRET);

    if (result) {
      return next();
    }
  } catch (e) {
    res.status(401).json({ message: e.message, content: e });
  }
};
