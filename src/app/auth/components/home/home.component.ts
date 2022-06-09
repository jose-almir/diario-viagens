import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bgImg = "pexels-_getinspoco_-bibhash-banerjee-1056528.jpg"
  
  imgCarousel: String[] = ["./assets/img/img-carousel01.jpg", "./assets/img/img-carousel02.jpg", "./assets/img/img-carousel03.jpg"]
  constructor() { }

  ngOnInit(): void {
  }

}
