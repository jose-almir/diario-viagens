import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  imgCarousel: String[] = ["./assets/img/img-carousel01.jpg", "./assets/img/img-carousel02.jpg", "./assets/img/img-carousel03.jpg"]

  constructor() { }

  ngOnInit(): void {
  }

}
