import { Guid } from "guid-typescript";

//guid é um tipo de dado que garante que seu valor nunca se repetirá
export interface Peca {
    id: Guid;
    nome: string;
    valor: number;
}