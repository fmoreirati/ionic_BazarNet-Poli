import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
   
    children: [
      {
        path: 'lojasLocais',
        loadChildren: () => import('../pages/loja-locais/loja-locais.module').then(m => m.LojaLocaisPageModule)
      },
      {
        path: 'lojaForm',
        loadChildren: () => import('../pages/loja-form/loja-form.module').then( m => m.LojaFormPageModule)
      },
      {
        path: 'lojaPerfil/:id',
        loadChildren: () => import('../pages/loja-perfil/loja-perfil.module').then( m => m.LojaPerfilPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'usuarioList',
        loadChildren: () => import('../pages/usuario-list/usuario-list.module').then(m => m.UsuarioListPageModule),
        canActivate: [AngularFireAuthGuard], 
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'usuarioForm',
        loadChildren: () => import('../pages/usuario-form/usuario-form.module').then( m => m.UsuarioFormPageModule)
      },
      {
        path: 'usuarioForm/:id',
        loadChildren: () => import('../pages/usuario-form/usuario-form.module').then( m => m.UsuarioFormPageModule)
      },
      {
        path: 'usuarioPerfil/:id',
        loadChildren: () => import('../pages/usuario-pefil/usuario-pefil.module').then( m => m.UsuarioPefilPageModule)
      },
      {
        path: 'usuarioPerfil',
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
