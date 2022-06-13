import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule, // para utilizar o routerLink na navbar
  ],
  exports: [ // são os componentes, pipes e etc que ficam "públicos"
    NavbarComponent,
    FooterComponent,
  ],
})
export class CoreModule { }

/**
 * Guardas elementos de contexto global como serviços,
 * navbar, models e etc.
 */
