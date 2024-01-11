//Em TS, qdo temos um modelo apenas com propriedades, o recomendado é usar interface ao invés de class
export interface TipoServico {
    id: number;
    nome: string;
    valor: number
}