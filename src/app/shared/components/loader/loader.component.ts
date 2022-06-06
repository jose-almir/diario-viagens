import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  // Input property
  // ao usar <app-loader> é possível utilizar
  // <app-loader label="Carregando diários..."></app-loader>
  @Input() label: string = '';

  constructor() {}

  ngOnInit(): void {}
}
