import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiariosRoutingModule } from './diarios-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiarioAddComponent } from './components/diario-add/diario-add.component';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioEditComponent } from './components/diario-edit/diario-edit.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    DiarioAddComponent,
    DiarioDetailComponent,
    DiarioEditComponent,
    DiarioListComponent
  ],
  imports: [
    CommonModule,
    DiariosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule

  ]
})
export class DiariosModule { }
