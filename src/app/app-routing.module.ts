import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermosDeUsoComponent } from './core/components/termos-de-uso/termos-de-uso.component';

const routes: Routes = [
{path: 'termos-de-uso', component: TermosDeUsoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
