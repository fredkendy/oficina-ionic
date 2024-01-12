import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Guid } from 'guid-typescript';
import { Peca } from 'src/app/models/peca.model';
import { PecasService } from 'src/app/services/pecas.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pecas-listagem',
  templateUrl: './pecas-listagem.page.html',
  styleUrls: ['./pecas-listagem.page.scss'],
})
export class PecasListagemPage implements OnInit {

  public pecas: any;
  @ViewChild('slidingList') slidingList!: IonList;

  constructor(private pecasService: PecasService, private toastService: ToastService) { }

  ngOnInit() {
  
  }

  //Instrução transferida de ngOnInit, para a listagem ser atualizada toda vez que inserimos/atualizamos uma peça (ngOnInit funciona qdo a página é inicializada na primeira vez)
  //prefixo ion deixa claro que captura um evento de lifecycle de uma pág, mas do Ionic, ñ do Angular
  ionViewWillEnter() {
    this.pecasService.getAll().then(pecas => {
      this.pecas = pecas;
    });
  }

  //converte o id de Guid para String e em seguida para string JSON
  idAsString(id: Guid): string {
    const convertedId = JSON.parse(JSON.stringify(id));
    return convertedId.value;
  }

  //chama removeById do service
  async removerPeca(peca: Peca) {
    await this.pecasService.removeById(this.idAsString(peca.id));
    //repopular objeto utilizado na renderização
    this.pecas = await this.pecasService.getAll();
    this.toastService.presentToast('Peça removida', 3000, 'top');
    await this.slidingList.closeSlidingItems();
  }

}
