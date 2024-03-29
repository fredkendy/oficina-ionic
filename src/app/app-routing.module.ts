import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    //primeira página que será renderizada
    path: '',
    redirectTo: 'pecas-listagem',
    pathMatch: 'full'
  },
  {
    path: 'tipo-servicos-listagem',
    loadChildren: () => import('./pages/tipo-servicos/tipo-servicos-listagem/tipo-servicos-listagem.module').then( m => m.TipoServicosListagemPageModule)
  },
  {
    //especificar que haverá um parametro id
    path: 'tipo-servicos-add-edit/:id',
    loadChildren: () => import('./pages/tipo-servicos/tipo-servicos-add-edit/tipo-servicos-add-edit.module').then( m => m.TipoServicosAddEditPageModule)
  },
  {
    path: 'pecas-add-edit/:id',
    loadChildren: () => import('./pages/pecas/pecas-add-edit/pecas-add-edit.module').then( m => m.PecasAddEditPageModule)
  },
  {
    path: 'pecas-listagem',
    loadChildren: () => import('./pages/pecas/pecas-listagem/pecas-listagem.module').then( m => m.PecasListagemPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
