# 🔒 API Node.js + MongoDB: Autenticação Segura com JWT e Bcrypt

Uma API RESTful com autenticação de professores, desenvolvida em Node.js e MongoDB. **Projeto de cunho acadêmico avaliativo para apronfundar fundamentos de back-end, segurança e integração com banco de dados!**<br>
Todo o passo a passo de criação e desenvolvimento desse projeto se encontra nessa docuemntação**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## ✍🏻 Autor

<a><img src="https://github.com/user-attachments/assets/fa60aba8-3200-402d-8b9e-a004ed3de6cf" width="200px"></a><br><br>

Olá, Sou **Gabryell Leal** <br>

📍 **Localidade:** Campina Grande, Paraíba<br>
🎓 **Formação:** Sistemas de informação - UniFacisa, 4° Semestre<br>

Me encontre no **LinkedIn:**<br>
<a href="https://www.linkedin.com/in/gabryell-leal-rocha-1762392a0"><img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin" width="100"></a>

## ✨ Funcionalidades
- **Cadastro e autenticação de alunos, professores, perfis, turmas, disciplinas e tarefas** 
- **Apenas professores autenticados pode operar turmas, disciplinas e tarefas** (JWT)
- **Criptografia de senhas** com Bcrypt
- CRUD de recursos protegidos por token
- Configuração segura usando variáveis de ambiente (Dotenv)
- Integração profissional com MongoDB (Mongoose)

## 🛠️ Tecnologias
| Biblioteca      | Finalidade                          |
|-----------------|-------------------------------------|
| Express         | Servidor web e rotas                |
| Mongoose        | Conexão e modelos do MongoDB        |
| Nodemon         | Reinicialização automática (dev)    |
| Dotenv          | Gerenciamento de variáveis de ambiente |
| Bcrypt          | Criptografia de senhas              |
| JSON Web Token  | Autenticação stateless              |

## 🚀 Começando

### Pré-requisitos
- Node.js (v18+)
- MongoDB (local ou Atlas)
- Postman/Insomnia (para testar endpoints)

### Instalação
```bash
# Clone o repositório
git clone [https://github.com/lealgabryell/AtividadeIndividualSamara](https://github.com/lealgabryell/AtividadeIndividualSamara)

# Instale as dependências
npm install

# Crie o arquivo .env (veja o exemplo abaixo)
cp .env.example .env
```

### Configuração do Ambiente (.env)
```env
PORT=3000
```

### Executando a API
```bash
# Lembre-se de criar um Database no MongoCompass chamado avaliacao1 (precaução)
# Modo desenvolvimento (com Nodemon)
npm run dev
```

## 📡 Endpoints Principais

### Rotas sem autenticação (Para alunos)
| Método | Endpoint         | Descrição                       | Exemplo de Body                     |
|--------|------------------|---------------------------------|-------------------------------------|
| POST   | /api/aluno       | Registra novo aluno             | `{ "nome": "um nome", "idade":19 }` |
| GET    | /api/aluno       | Lista todos os usuários criados | `não é necessário`                  |
| PUT    | /api/aluno/:id   | Edita um aluno específico       | `{ "nome": "um nome", "idade":19 }` |
| DELETE | /api/aluno/:id   | Deleta um aluno específico      | `não é necessário`                  |



## 🔐 Boas Práticas de Segurança
- **Senhas nunca armazenadas em texto puro** (hash com Bcrypt)
- Tokens JWT com expiração e assinatura criptografada
- Variáveis sensíveis isoladas em `.env`

## 🤝 Como Contribuir
Deixa uma estrela no repositório! Depois disso:
1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Feito por _[Gabryell Leal Rocha]_** 
