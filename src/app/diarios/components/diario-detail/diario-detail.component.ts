import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';

@Component({
  selector: 'app-diario-detail',
  templateUrl: './diario-detail.component.html',
  styleUrls: ['./diario-detail.component.scss'],
})
export class DiarioDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private diariosService: DiariosService
  ) {}

  diario$?: Observable<Diario>;

  ngOnInit(): void {
    this.diario$ = this.diariosService.getDiarioById(
      this.route.snapshot.params['id']
    );
  }
}
