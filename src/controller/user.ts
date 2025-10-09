import { User } from "../model/user";
import { app } from "../server";
import { UserService } from "../service/user";

export function UserController() {
  const service = new UserService();

  app.get("/users", (req, res) => {
    const users = service.getUsers();

    const usersSemSenha = users.map((user) => ({
      id: user.getId(),
      nome: user.getNome(),
      telefone: user.getTelefone(),
      email: user.getEmail(),
      idade: user.getIdade(),
    }));

    res.json(usersSemSenha);
  });

  app.post("/users", (req, res) => {
    const userData = req.body;
    const newUser = service.createUser(userData);
    res.status(201).json({
      status: "Usuário criado com sucesso",
      id: newUser.getId(),
    });
  });

  app.post("/users/authenticacao", (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = service.autenticar(email, senha);

      // retorna versão pública (sem senha)
      res.json({
        status: "Autenticado com sucesso",
        data: {
          id: user.getId(),
          nome: user.getNome(),
          telefone: user.getTelefone(),
          email: user.getEmail(),
          idade: user.getIdade(),
        },
      });
    } catch (e: any) {
      return res.status(401).json({ error: e.message || "Não autorizado" });
    }
  });

  app.get("/users/search", (req, res) => {
    const { nome, idade } = req.query;

    if (nome) {
      const user = service.getUserByNome(nome as string);
      if (user) {
        return res.status(200).json(user);
      }
    }
    if (idade) {
      const idadeNumber = parseInt(idade as string);
      const user = service.getUserByIdade(idadeNumber);
      if (user) {
        return res.status(200).json(user);
      }
    }

    return res.status(404).json({ message: "Usuário não encontrado" });
  });
}
