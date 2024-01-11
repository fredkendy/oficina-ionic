import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoServico } from 'src/app/models/tipo-servico.model';
import { TipoServicosService } from 'src/app/services/tipo-servicos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tipo-servicos-add-edit',
  templateUrl: './tipo-servicos-add-edit.page.html',
  styleUrls: ['./tipo-servicos-add-edit.page.scss'],
})
export class TipoServicosAddEditPage implements OnInit {

  //conterá o tipo de serviço selecionado na pág de listagem e terá seus dados consumidos pelo template de exibicao dos detalhes
  //essa variável implementará TipoServico, que é uma interface
  public tipoServico!: TipoServico;

  //Sinaliza modo de edição e consulta
  public modoDeEdicao = false;

  public tiposServicosForm!: FormGroup;

  //injeção de dependências
  constructor(private route: ActivatedRoute, private tipoServicoService: TipoServicosService, private formBuilder: FormBuilder, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    //recupera o parametro enviado pela página de listagem e o utiliza para recuperar o obj completo que então é atribuído à nossa propriedade
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.tipoServico = this.tipoServicoService.getById(id);

    //envio de parametro com valor -1, que mostra que queremos interface de inserção.
    //no else, temos instruções de inicialização 
    if (id > 0) {
      this.tipoServico = this.tipoServicoService.getById(id);
    } else {
      this.tipoServico = {id, nome: '', valor: 0.00}
      this.modoDeEdicao = true;
    }

    //Formulário 
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
    this.toastService.presentToast('Gravação bem sucedida', 3000, 'top');
    this.router.navigateByUrl('');
    this.modoDeEdicao = false;
  }

  cancelarEdicao() {
    this.tiposServicosForm.setValue(this.tipoServico);
    this.modoDeEdicao = false;
  }
  
}
