import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //Definindo comunicação com o recurso de armazenamento (precisa dessa conexão em toda a aplicação)
  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }
}
