import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { UsuarioNaoVerificadoComponent } from './components/usuario-nao-verificado/usuario-nao-verificado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    UsuarioNaoVerificadoComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AuthModule {}

