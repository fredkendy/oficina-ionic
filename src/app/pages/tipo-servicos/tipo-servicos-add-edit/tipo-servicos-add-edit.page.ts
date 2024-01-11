import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoServicosService } from 'src/app/services/tipo-servicos.service';

@Component({
  selector: 'app-tipo-servicos-add-edit',
  templateUrl: './tipo-servicos-add-edit.page.html',
  styleUrls: ['./tipo-servicos-add-edit.page.scss'],
})
export class TipoServicosAddEditPage implements OnInit {

  //conterá o tipo de serviço selecionado na pág de listagem e terá seus dados consumidos pelo template de exibicao dos detalhes
  public tipoServico: any;

  //Sinaliza modo de edição e consulta
  public modoDeEdicao = false;

  public tiposServicosForm!: FormGroup;

  constructor(private route: ActivatedRoute, private tipoServicoService: TipoServicosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    //recupera o parametro enviado pela página de listagem e o utiliza para recuperar o obj completo que então é atribuído à nossa propriedade
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.tipoServico = this.tipoServicoService.getById(id);

    this.tiposServicosForm = this.formBuilder.group({
      id,
      nome: [this.tipoServico.nome, Validators.required],
      valor: [this.tipoServico.valor, Validators.required]
    })
  }

  //registra que o tipo de serviço está em processo de edição
  iniciarEdicao() {
    this.modoDeEdicao = true;
  }

  submit() {
    //update vem do tipo-servicos.service.ts
    this.tipoServicoService.update(this.tiposServicosForm.value);
    this.modoDeEdicao = false;
  }

  cancelarEdicao() {
    this.tiposServicosForm.setValue(this.tipoServico);
    this.modoDeEdicao = false;
  }
  
}
