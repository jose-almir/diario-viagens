import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toast: HotToastService
    ) {}

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
    this.authService.logout('/login')
    .pipe(
      this.toast.observe({
        success: 'Você foi desconectado, Ate breve',
        error: 'Um erro ocorreu',
        loading: 'Fazendo logout...',
      })).subscribe()
      };

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
  }
}
