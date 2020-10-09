import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'usuarioList',
        loadChildren: () => import('../pages/usuario-list/usuario-list.module').then(m => m.UsuarioListPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'usuarioForm',
        loadChildren: () => import('../pages/usuario-form/usuario-form.module').then( m => m.UsuarioFormPageModule)
      },
      {
        path: 'usuarioPerfil/:id',
        loadChildren: () => import('../pages/usuario-pefil/usuario-pefil.module').then( m => m.UsuarioPefilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
