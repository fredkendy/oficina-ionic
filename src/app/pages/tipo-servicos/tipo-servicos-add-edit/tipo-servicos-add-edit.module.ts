import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoServicosAddEditPageRoutingModule } from './tipo-servicos-add-edit-routing.module';

import { TipoServicosAddEditPage } from './tipo-servicos-add-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoServicosAddEditPageRoutingModule
  ],
  declarations: [TipoServicosAddEditPage]
})
export class TipoServicosAddEditPageModule {}
