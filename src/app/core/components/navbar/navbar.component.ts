import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  logged$?: Observable<any>;
  logged: any;

  logout() {
    this.authService.logout('/login').subscribe();
  }

  muda(){
    console.log("muda por favor")
    var toolbar = document.getElementById("toolbar") as HTMLButtonElement
    var i = toolbar.getAttribute("class")

    if (i == "mat-toolbar mat-primary mat-toolbar-single-row") {
      toolbar.setAttribute("class", "mat-toolbar mat-accent mat-toolbar-single-row");
    }else{
      toolbar.setAttribute("class", "mat-toolbar mat-primary mat-toolbar-single-row");
    }
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
    this.authService.logged.subscribe
    (value =>{
      this.logged = value;
    })
  }

}
