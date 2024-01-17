import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Cliente } from '../models/cliente.model';
import { databaseName } from './database.statements';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private databaseService: DatabaseService) {}
  public async getAll() {
    const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
    db.open();
    
    let returnQuery = await db.query('SELECT * FROM	clientes ORDER BY nome');
    db.close();

    //@ts-ignore
    if (returnQuery.values.length > 0) {
      let clientes: Cliente[] = [];
      //@ts-ignore
      for (let i = 0; i < returnQuery.values.length; i++) {
        //@ts-ignore
        const cliente = returnQuery.values[i];
        clientes.push(cliente);
      }
      return clientes;
    }
    return [];
  }
}
