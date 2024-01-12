//serviço que atenderá as interações que exijam busca e armazenamento de dados na base
import { Injectable } from '@angular/core';
import { Peca } from '../models/peca.model';
import { Guid } from 'guid-typescript';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PecasService {
    //injetar dependencia de persistencia
  constructor(private storage: Storage) {}

  async update(peca: Peca) {
    //cria base de dados
    await this.storage.create();
    //caso seja um novo objeto, sem id, este será gerado
    if (peca.id.isEmpty()) {
      peca.id = Guid.create();
    }
    //armazenar par chave/valor (IndexedDB: chave precisa ser string)
    this.storage.set(peca.id.toString(), JSON.stringify(peca));
  }
}
