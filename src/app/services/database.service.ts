import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { createSchema } from './database.statements';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  sqliteConnection!: SQLiteConnection; //plugin
  platform!: string; //plataforma de execução do app
  native: boolean = false; //isNative
  sqlitePlugin: any; //acesso direto ao plugin

  //inicialização do plugin no contexto da aplicação. Promise: retornará um booleano
  async initializePlugin(): Promise<boolean> {
    return new Promise((resolve) => {
      //busca dados, como: plataforma, se é nativo, plugin do SQL p/ o capacitor, buscando conexão com o banco
      this.platform = Capacitor.getPlatform();
      if (this.platform === 'ios' || this.platform === 'android')
        this.native = true;
      this.sqlitePlugin = CapacitorSQLite;
      this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
      resolve(true);
    });
  }

  //criar conexão com a nossa base de dados. nome do banco, se é encriptado, modo de criptografia, versão do banco
  async createConnection(
    database: string,
    encrypted: boolean,
    mode: string,
    version: number,
    readonly: boolean
  ): Promise<SQLiteDBConnection> {
    if (this.sqliteConnection != null) {
      try {
        const db: SQLiteDBConnection =
          await this.sqliteConnection.createConnection(
            database,
            encrypted,
            mode,
            version,
            false
          );
        if (db != null) {
          // chamando createSchema, aproveitando a verificação da não nulidade da conexão
          await this.createSchema(db);
          return Promise.resolve(db);
        } else {
          return Promise.reject(new Error(`Erro ao criar a conexão`));
        }
      } catch (err) {
        return Promise.reject(new Error(err as string));
      }
    } else {
      return Promise.reject(
        new Error(`Nenhuma conexão disponível para ${database}`)
      );
    }
  }

  //recebe SQLiteDBConnection na variável db, abre conexao, executa instrução, fecha conexao com a base e retorna resultado
  private async createSchema(db: SQLiteDBConnection): Promise<void> {
    await db.open();
    let createSchemma: any = await db.execute(createSchema);
    await this.populateDatabase(db);
    await db.close();
    if (createSchemma.changes.changes < 0) {
      return Promise.reject(new Error('Erro	na	criação	das	tabelas'));
    }
    return Promise.resolve();
  }

  //consulta que retorna qtd de registros que tem na tabela. se n tiver registros, insere os iniciais
  private async populateDatabase(db: SQLiteDBConnection): Promise<void> {
    let returnQuery = await db.query('select	COUNT(ordemdeservicoid)	as	qtdeOS	from	ordensdeservico;');
    //@ts-ignore
    if (returnQuery.values[0].qtdeOS === 0) {
      let sqlcmd: string = 'INSERT	INTO	ordensdeservico	(ordemdeservicoid,	clienteid,	veiculo,	dataehoraentrada,	dataehoratermino)	VALUES	(?,?,?,?,?)';
      let values: Array<any> = [
        Guid.create().toString(),
        Guid.create().toString(),
        'ABC-1235',
        Date.now(),
        null,
      ];
      let returnInsert = await db.run(sqlcmd, values);
      //@ts-ignore
      if (returnInsert.changes < 0) {
        return Promise.reject(new Error('Erro	na	inserção	da	ordem	de	serviço'));
      }
    }
    return Promise.resolve();
  }
}
