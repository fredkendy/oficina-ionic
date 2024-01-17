import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { OrdensDeServicoService } from 'src/app/services/ordensdeservico.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-ordensdeservico-listagem',
  templateUrl: './ordensdeservico-listagem.page.html',
  styleUrls: ['./ordensdeservico-listagem.page.scss'],
})
export class OrdensdeservicoListagemPage implements OnInit {

  public ordensDeServico:	 | OrdemDeServico[]	=	[];
  @ViewChild('slidingList')	slidingList!: IonList;

  constructor(private ordensdeservicoService: OrdensDeServicoService, private toastService: ToastService, private alertService: AlertService) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    const oss = await	this.ordensdeservicoService.getAll();
    this.ordensDeServico = oss;
  }

  //Será possível remover através da página de listagem
  async removerAtendimento(ordemdeservico: OrdemDeServico) {
    await this.ordensdeservicoService.removeById(ordemdeservico.ordemdeservicoid)
      .then(async () => {
        this.ordensDeServico = await this.ordensdeservicoService.getAll();
        this.toastService.presentToast('Ordem de Serviço removida', 3000, 'top');
        await this.slidingList.closeSlidingItems();
      })
      .catch(async (e) => await this.alertService.presentAlert('Falha', 'Remoção não foi executada', e, ['Ok']));
  }

}
