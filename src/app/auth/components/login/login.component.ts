import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  hide?: boolean = false;
  // Ofuscar senha 
  changeView() {
    if (this.hide === true) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  siteKey: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService
  ) { this.siteKey = '6Lf5nmQgAAAAAGBE82rwfwIllPqz90bkIuXEjzei'; }

  onSubmit() {
    const { email, senha } = this.loginForm.value;
    this.authService
      .loginEmail(email, senha)
      .pipe(
        this.toast.observe({
          success: 'Boas Vindas',
          error: 'Um erro ocorreu',
          loading: 'Fazendo login...',
        })
      )
      .subscribe();
  }


  onLoginGoogle() {
    this.authService
      .loginGoogle()
      .pipe(
        this.toast.observe({
          success: 'Login efetuado',
          error: 'Operação cancelada',
          loading: 'Fazendo login...',
        })
      )
      .subscribe();
  }

  onLoginFacebook() {
    this.authService
      .loginFacebook()
      .pipe(
        this.toast.observe({
          success: 'Login efetuado',
          error: 'Operação cancelada',
          loading: 'Fazendo login...',
        })
      )
      .subscribe();
  }

  ngOnInit(): void { }
}


