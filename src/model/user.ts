import bcrypt from "bcryptjs";

export class User {
  constructor(
    private id: string,
    private nome: string,
    private telefone: string,
    private email: string,
    private senha: string,
    private idade?: number
  ) {
    if (!nome) throw new Error("nome obrigatório");
    if (!telefone) throw new Error("telefone obrigatório");
    if (!email) throw new Error("email obrigatório");
    if (!senha) throw new Error("senha obrigatória");
    if (nome.length < 3) throw new Error("nome muito curto");
    if (senha.length < 6) throw new Error("senha muito curta");
  }

  static create(
    nome: string,
    telefone: string,
    email: string,
    senha: string,
    idade?: number
  ) {
    const id = crypto.randomUUID();
    const hashedPassword = bcrypt.hashSync(senha);
    return new User(id, nome, telefone, email, hashedPassword, idade);
  }

  verifyPassword(senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getIdade(): number | undefined {
    return this.idade;
  }

  getEmail(): string {
    return this.email;
  }

  getSenha(): string {
    return this.senha;
  }

  // Setters
  setNome(nome: string): void {
    this.nome = nome;
  }

  setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setSenha(senha: string): void {
    const hashedPassword = bcrypt.hashSync(senha);
    this.senha = hashedPassword;
  }

  setIdade(idade: number): void {
    this.idade = idade;
  }
}
