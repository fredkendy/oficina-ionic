import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-servicos-listagem',
  templateUrl: './tipo-servicos-listagem.page.html',
  styleUrls: ['./tipo-servicos-listagem.page.scss'],
})
export class TipoServicosListagemPage implements OnInit {

  public tiposServicos = [
    {id: 1, nome: 'Alinhamento', valor: 127.40},
    {id: 2, nome: 'Balanceamento', valor: 118.80},
    {id: 3, nome: 'Revisão dos freios', valor: 189.10},
    {id: 4, nome: 'Kit Suspensão', valor: 497.00},
    {id: 5, nome: 'Troca da embreagem', valor: 515.90},
    {id: 6, nome: 'Troca de óleo', valor: 140.00},
    {id: 7, nome: 'Limpeza de bicos', valor: 79.00},
    {id: 8, nome: 'Troca das bobinas/velas', valor: 199.90},
    {id: 9, nome: 'Troca de correias e tensores', valor: 189.90}
  ]

  constructor() { }

  ngOnInit() {
  }

}
