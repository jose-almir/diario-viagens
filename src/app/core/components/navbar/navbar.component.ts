import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  classesColor: string = "primary";
  ativo: boolean = true;
  
  constructor(private authService: AuthService) {}

  logged$?: Observable<any>;

  logout() {
    this.authService.logout('/login').subscribe();
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
  }

  onToggle() {
    this.ativo = !this.ativo;

    if (this.ativo) {
      this.classesColor = "primary";
    } else {
      this.classesColor = "accent";
    }
  }
}
