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

  ngOnInit(): void {
    //como o getAll é async, temos uma promise para popular nossa coleção que será usada pelo template
    //outra opção seria transformar o ngOnInit em async e invocar com await
    this.pecasService.getAll().then(pecas => {
      this.pecas = pecas;
    });
  }

  //converte o id de Guid para String e em seguida para JSON
  idAsString(id: Guid): string {
    const convertedId = JSON.parse(JSON.stringify(id));
    return convertedId.value;
  }

}
