import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';

@Component({
  selector: 'app-diario-delete',
  templateUrl: './diario-delete.component.html',
  styleUrls: ['./diario-delete.component.scss']
})
export class DiarioDeleteComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private diario: Diario,
    private ref: MatDialogRef<DiarioDeleteComponent>
  ) { }

  onSubmit() {
      
      this.ref.close({ diario: this.diario });
  }

  ngOnInit(): void {
  }

}
