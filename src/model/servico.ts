export class Servico {
  constructor(
    private id: string,
    private nome: string,
    private preco: number,
    private tempoEstimado: number
  ) {
    if (!nome) throw new Error("nome obrigatório");
    if (preco === undefined || preco === null) throw new Error("preco obrigatório");
    if (tempoEstimado === undefined || tempoEstimado === null) throw new Error("tempoEstimado obrigatório");

    if (nome.length < 3) throw new Error("nome muito curto");
    if (preco <= 0) throw new Error("preco deve ser maior que 0");
    if (tempoEstimado <= 0) throw new Error("tempoEstimado deve ser maior que 0");
  }

  static create(nome: string, preco: number, tempoEstimado: number) {
    const id = crypto.randomUUID();
    return new Servico(id, nome, preco, tempoEstimado);
  }

  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getPreco(): number {
    return this.preco;
  }

  getTempoEstimado(): number {
    return this.tempoEstimado;
  }
}
