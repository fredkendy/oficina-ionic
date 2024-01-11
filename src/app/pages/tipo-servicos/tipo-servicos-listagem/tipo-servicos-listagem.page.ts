import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { TipoServico } from 'src/app/models/tipo-servico.model';
import { TipoServicosService } from 'src/app/services/tipo-servicos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tipo-servicos-listagem',
  templateUrl: './tipo-servicos-listagem.page.html',
  styleUrls: ['./tipo-servicos-listagem.page.scss'],
})
export class TipoServicosListagemPage implements OnInit {

  public tiposServicos: any[] = [];

  //slidingList é a variável de template (podemos capturar comportamento e executar uma função (remoção))
  @ViewChild('slidingList') slidingList!: IonList;

  constructor(private tipoServicoService: TipoServicosService, private toastService: ToastService) { }

  ngOnInit() {
    this.tiposServicos = this.tipoServicoService.getAll();
  }

  async removerTipoServico(tipoServico: TipoServico) {
    //remove vem do service
    this.tipoServicoService.remove(tipoServico);
    this.toastService.presentToast('Tipo de serviço removido', 3000, 'top');
    //permite que após a remoção de um item, outros deslizes possam ser realizados
    await this.slidingList.closeSlidingItems();
  }

}
