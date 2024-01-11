//Serviço que oferecerá acesso aos dados que deverão ser consumidos (Provider para toda a aplicação)
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TipoServicosService {
   
    private tiposServicos = [
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

    getById(id: number) {
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
    update(tipoServico: any) {
        this.tiposServicos[this.getIndexOfElement(tipoServico.id)] = tipoServico;
    }

    //recuperar todos os tipos de serviços (array declarado acima)
    getAll() {
        return this.tiposServicos;
    }

}