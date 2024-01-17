import { Injectable } from '@angular/core';
import { OrdemDeServico } from '../models/ordemdeservico.model';
import { DatabaseService } from './database.service';
import { databaseName } from './database.statements';
import { Guid } from 'guid-typescript';

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

  //atualizar o registro na base de dados, ou inserir um novo
  async update(ordemdeservico: OrdemDeServico): Promise<void> {
    //variaveis responsaveis pro conter a instrução sql e os parametros da instrução
    let sql: any;
    let params: any;

    //se id for Guid, verificamos que tipo de instrução sql deve se preparar
    //se for inserção, cria um Guid para a propriedade
    if (Guid.parse(ordemdeservico.ordemdeservicoid).isEmpty()) {
      ordemdeservico.ordemdeservicoid = Guid.create().toString();
      sql = 'INSERT INTO ordensdeservico(ordemdeservicoid, clienteid, veiculo, dataehoraentrada) ' + 'values(?, ?, ?, ?)';
      params = [ordemdeservico.ordemdeservicoid, ordemdeservico.clienteid, ordemdeservico.veiculo, ordemdeservico.dataehoraentrada];
    } else {
      console.log(ordemdeservico.ordemdeservicoid);
      console.log(ordemdeservico.dataehoraentrada);

      sql = 'UPDATE ordensdeservico SET clienteid = ?, veiculo = ?, ' + 'dataehoraentrada = ? WHERE ordemdeservicoid = ?';
      params = [ordemdeservico.clienteid, ordemdeservico.veiculo, ordemdeservico.dataehoraentrada, ordemdeservico.ordemdeservicoid];
    }

    try {
      const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
      db.open();
      await db.run(sql, params);
      db.close();
    } catch (e) {
        console.error(e);
    }
}

}
