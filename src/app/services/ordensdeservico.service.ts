import { Injectable } from '@angular/core';
import { OrdemDeServico } from '../models/ordemdeservico.model';
import { DatabaseService } from './database.service';
import { databaseName } from './database.statements';

@Injectable({
  providedIn: 'root',
})
export class OrdensDeServicoService {
  constructor(private databaseService: DatabaseService) {}
  
  public async getAll() {
    const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
    db.open();
    let returnQuery = await db.query('SELECT * FROM	ordensdeservico;');
    let ordensdeservico: OrdemDeServico[] = [];
    //@ts-ignore
    if (returnQuery.values.length > 0) {
      //@ts-ignore
      for (let i = 0; i < returnQuery.values.length; i++) {
        //@ts-ignore
        const ordemdeservico = returnQuery.values[i];
        console.log(`OS> ${ordemdeservico}`);
        ordensdeservico.push(ordemdeservico);
      }
    }
    return ordensdeservico;
  }

  //recebe id vindo do template para parametrizar a edição
  public async getById(id: string): Promise<any> {
    try {
        const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
        const sql = 'select * from ordensdeservico where ordemdeservicoid = ?';
        try {
            db.open();
            const data = await db.query(sql, [id]);
            db.close();
            //@ts-ignore
            if (data.values.length > 0) {
                //@ts-ignore
                const ordemdeservico: OrdemDeServico = data.values[0]; //obtém primeiro item da coleção
                ordemdeservico.dataehoraentrada = new Date(ordemdeservico.dataehoraentrada); //dataehoraentrada é do tipo date, ent é necessario converter
                return ordemdeservico;
            } else {
                return null;
            }
        } catch (e) {
            return console.error(e);
        }
    } catch (e) {
        return console.error(e);
    }
}
}
