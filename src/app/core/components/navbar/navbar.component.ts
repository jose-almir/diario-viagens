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

  corDaNav: string = "primary" 

  mudarCor() {
    if(this.corDaNav === "primary") {
      this.corDaNav = "accent"
    } else {
      this.corDaNav = "primary"
    }
  }

  logout() {
    this.authService.logout('/login').subscribe();
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
  }
}
