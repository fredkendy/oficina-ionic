import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { createClientesTable, createOrdensDeServicoTable } from './database.statements';
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
    //constante do database.statements.ts
    let createClienteSchema: any = await db.execute(createClientesTable);
    let createOOSchema: any = await db.execute(createOrdensDeServicoTable);
    
    await this.populateDatabase(db);
    await db.close();
    console.log("Fechou conexão");
    return Promise.resolve();
  }

  //Invoca os 2 métodos que populam as respectivas tabelas
  private async populateDatabase(db: SQLiteDBConnection): Promise<void> {
    const clienteID = Guid.create().toString();

    await this.populateClientes(db, clienteID);
    await this.populateOrdensDeServico(db, clienteID);

    return Promise.resolve();
}

  //consulta que retorna qtd de registros que tem na tabela. se n tiver registros, insere os iniciais
  private async populateOrdensDeServico(db: SQLiteDBConnection, clienteID: String): Promise<void> {
    let returnQuery = await db.query("select COUNT(ordemdeservicoid) as qtdeOS from ordensdeservico;");

    //@ts-ignore
    if (returnQuery.values[0].qtdeOS === 0) {
      let sqlcmd: string = "INSERT INTO ordensdeservico (ordemdeservicoid, clienteid, veiculo, dataehoraentrada, dataehoratermino) VALUES (?,?,?,?,?)";
      let values: Array<any> = [Guid.create().toString(), clienteID, 'ABC-1235', Date.now(), null];

      let returnInsert = await db.run(sqlcmd, values);
      //@ts-ignore
      if (returnInsert.changes < 0) {
          return Promise.reject(new Error("Erro na inserção da ordem de serviço"));
      }
    }
    return Promise.resolve();
  }

  private async populateClientes(db: SQLiteDBConnection, clienteID: String): Promise<void> {
    let returnQuery = await db.query("select COUNT(clienteid) as qtdeClientes from clientes;");

    //@ts-ignore
    if (returnQuery.values[0].qtdeClientes === 0) {
      let sqlcmd: string = "INSERT INTO clientes (clienteid, nome, email, telefone, renda) VALUES (?,?,?,?,?)";
      let values: Array<any> = [clienteID, 'Ambrózio', 'ambrozio@casadocodigo.com.br', '91234-5668', 123];

      let returnInsert = await db.run(sqlcmd, values);
      //@ts-ignore
      if (returnInsert.changes < 0) {
        return Promise.reject(new Error("Erro na inserção da clientes"));
      }
    }

    return Promise.resolve();
  }
}
