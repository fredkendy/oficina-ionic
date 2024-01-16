import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //informa o sucesso ou não do processo de inicialização do plugin (sqlite)
  private initPlugin!: boolean;

  //storage: Definindo comunicação com o recurso de armazenamento (precisa dessa conexão em toda a aplicação)
  //databaseService e platform (p/ uso do SQLite e capacitor)
  constructor(
    private storage: Storage,
    private platform: Platform,
    private databaseService: DatabaseService,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    await this.storage.create();
  }

  //inicializará o plugin e criará a conexão com a base de dados
  async initializeApp() {
    this.platform.ready().then(async () => {
      this.databaseService.initializePlugin().then(async (ret) => {
        try {
          const db = await this.databaseService.createConnection(
            'oficina',
            false,
            'no-encryption',
            1,
            false
          );
          this.initPlugin = ret;
        } catch (err) {
          console.log(`Error:	${err}`);
          this.initPlugin = false;
        }
        console.log('Status	da	inicialização	do	plugin:	' + this.initPlugin);
      });
    });
  }
}
