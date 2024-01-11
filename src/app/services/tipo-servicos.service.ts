//Serviço que oferecerá acesso aos dados que deverão ser consumidos (Provider para toda a aplicação)
import { Injectable } from "@angular/core";
import { TipoServico } from "../models/tipo-servico.model";

@Injectable({
    providedIn: 'root',
})
export class TipoServicosService {
   
    //tipificar o objeto array (TipoServico é a interface que implementa id, nome e valor)
    private tiposServicos: TipoServico[] = [
        {id: 1, nome: 'Alinhamento', valor: 127.40},
        {id: 2, nome: 'Balanceamento', valor: 118.80},
        {id: 3, nome: 'Revisão dos freios', valor: 189.10},
        {id: 4, nome: 'Kit Suspensão', valor: 497.00},
        {id: 5, nome: 'Troca da embreagem', valor: 515.90},
        {id: 6, nome: 'Troca de óleo', valor: 140.00},
        {id: 7, nome: 'Limpeza de bicos', valor: 79.00},
        {id: 8, nome: 'Troca das bobinas/velas', valor: 199.90},
        {id: 9, nome: 'Troca de correias e tensores', valor: 189.90}
    ];

    constructor() {}

    getById(id: number): TipoServico {
        const tipoServicoSelecionado = this.tiposServicos.filter(
            tipoServico => tipoServico.id === id
        );
        return tipoServicoSelecionado[0];
    }

    //retorna índice do elemento referente ao id que o método recebe
    private getIndexOfElement(id: number): number {
        return this.tiposServicos.indexOf(this.getById(id));
    }

    //atualiza o elemento com o indice recuperado pelo método getIndexOfELement
    update(tipoServico: TipoServico) {
        //com base no id, o método saberá se é para atualizar ou inserir
        if (tipoServico.id < 0) {
            tipoServico.id = this.tiposServicos[this.tiposServicos.length - 1].id + 1;
            this.tiposServicos.push(tipoServico);
        } else {
            this.tiposServicos[this.getIndexOfElement(tipoServico.id)] = tipoServico;
        }
    }

    //recuperar todos os tipos de serviços (array declarado acima)
    getAll(): TipoServico[] {
        return this.tiposServicos;
    }

    remove(tipoServico: TipoServico) {
        this.tiposServicos.splice(this.getIndexOfElement(tipoServico.id), 1);
    }

}