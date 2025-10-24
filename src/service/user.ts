import { User } from "../model/user";

export class UserService {
  lista: User[] = [];

  criarUsuario(user: {
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

  editarUsuario(
    email: string,
    dados: {
      nome?: string;
      telefone?: string;
      senha?: string;
      idade?: number;
    }
  ): User {
    const user = this.lista.find((user) => user.getEmail() === email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (dados.nome) user.setNome(dados.nome);
    if (dados.telefone) user.setTelefone(dados.telefone);
    if (dados.senha) user.setSenha(dados.senha);
    if (dados.idade !== undefined) user.setIdade(dados.idade);

    return user;
  }

  listarUsuarios(): User[] {
    return this.lista;
  }

  buscarUsuarioPorNome(nome: string): User | undefined {
    return this.lista.find((user) => user.getNome() === nome);
  }

  buscarUsuarioPorIdade(idade: number): User | undefined {
    return this.lista.find((user) => user.getIdade() === idade);
  }

  // Métodos de filtro que retornam listas
  filtrarUsuariosPorIdade(idade: number): User[] {
    return this.lista.filter((user) => user.getIdade() === idade);
  }

  filtrarUsuariosPorFaixaEtaria(idadeMin: number, idadeMax: number): User[] {
    return this.lista.filter((user) => {
      const userIdade = user.getIdade();
      return (
        userIdade !== undefined &&
        userIdade >= idadeMin &&
        userIdade <= idadeMax
      );
    });
  }

  filtrarUsuariosPorNome(nome: string): User[] {
    return this.lista.filter((user) =>
      user.getNome().toLowerCase().includes(nome.toLowerCase())
    );
  }
}
