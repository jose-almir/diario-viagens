import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

// Configura uma guarda para redirecionar o usuário para /login
// caso ele não esteja logado
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'diarios',
    pathMatch: 'full',
  },
  {
    path: 'diarios',
    component: DiarioListComponent,
    ...canActivate(redirectUnauthorizedToLogin), // só pode acessar a rota quem estiver logado
  },
  // Essa rota é dinâmica
  // /diarios/dasdas2133
  {
    path: 'diarios/:id',
    component: DiarioDetailComponent,
    ...canActivate(redirectUnauthorizedToLogin), // só pode acessar a rota quem estiver logado
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiariosRoutingModule {}
