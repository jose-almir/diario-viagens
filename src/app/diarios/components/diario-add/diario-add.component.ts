import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';

@Component({
  selector: 'app-diario-add',
  templateUrl: './diario-add.component.html',
  styleUrls: ['./diario-add.component.scss'],
})
export class DiarioAddComponent implements OnInit {
  diario: Diario = {} as Diario;
  imagem?: File;

  setImage(ev: any) {
   
    this.imagem = ev.target.files[0];
  }

  constructor(private ref: MatDialogRef<DiarioAddComponent>) {}

  onSubmit() {
    this.ref.close({ diario: this.diario, imagem: this.imagem });
  }

  ngOnInit(): void {}
}
