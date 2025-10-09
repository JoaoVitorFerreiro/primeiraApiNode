import { User } from "../model/user";

export class UserService {
  lista: User[] = [];

  createUser(user: {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    idade?: number;
  }): User {
    const userCreated = User.create(
      user.nome,
      user.telefone,
      user.email,
      user.senha,
      user.idade
    );
    this.lista.push(userCreated);
    return userCreated;
  }

  autenticar(email: string, senha: string): User {
    const user = this.lista.find((user) => user.getEmail() === email);
    if (!user || !user.verifyPassword(senha)) {
      throw new Error("Email ou senha inválidos");
    }
    return user;
  }

  getUsers(): User[] {
    return this.lista;
  }

  getUserByNome(nome: string): User | undefined {
    return this.lista.find((user) => user.getNome() === nome);
  }

  getUserByIdade(idade: number): User | undefined {
    return this.lista.find((user) => user.getIdade() === idade);
  }
}
