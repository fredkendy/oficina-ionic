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
    //Resolvendo erro na atualização de dados (id da peça perde referencia para o tipo Guid, desconhecendo o isEmpty)
    peca.id = Guid.parse(JSON.parse(JSON.stringify(peca.id)).value);
    //caso seja um novo objeto, sem id, este será gerado
    if (peca.id.isEmpty()) {
      peca.id = Guid.create();
    }
    //armazenar par chave/valor (IndexedDB: chave precisa ser string)
    this.storage.set(peca.id.toString(), JSON.stringify(peca));
  }

  //Método para recuperar dados persistidos
  async getAll() {
    //tslint:disable-next-line:prefer-const
    let pecas: Peca[] = []; //array que será populado com objetos recuperados do armazenamento físico por meio do forEach assincrono
    try {
      await this.storage.forEach((value: string, key: string) => {
        const peca: Peca = JSON.parse(value);
        pecas.push(peca);
      });
      return pecas;
    } catch (error) {
      return error;
    }
  }

  async getById(id: string): Promise<Peca> {
    //recuperacao do valor na base de dados
    const pecaString = await this.storage.get(id);
    //Transformar de string para JSON
    return JSON.parse(pecaString);
  }

  //método para remoção
  async removeById(id: string) {
    await this.storage.remove(id);
  }
}
