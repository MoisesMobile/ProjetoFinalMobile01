export default class MoedaFiat {
  moeda: string;
  valor: string;

  constructor(moeda: string, valor: string) {
    this.moeda = moeda;
    this.valor = valor;
  }

  // Método auxiliar para recriar a classe a partir de objeto puro
  static fromJson(json: any): MoedaFiat {
    return new MoedaFiat(json.moeda, json.valor);
  }
}
