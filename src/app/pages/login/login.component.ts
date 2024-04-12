import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;

  formLogin: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private authSvc: AuthService,
    private router: Router,
    private _dialog: MatDialog
  ) {}

  iniciarSesion() {
    this.authSvc
      .iniciarSesion(this.formLogin.value)
      .pipe(
        catchError((error) => {
          this.snackbar.open('Advertencia: ' + error.error.mensaje);
          return error;
        })
      )
      .subscribe((response: any) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('user', JSON.stringify(response.usuario));
        this.snackbar.open(
          'Bienvenid@, ' + JSON.stringify(response.usuario.nombres)
        );
        this.router.navigate(['/perfil']);
      });
  }

  crearConsignacion() {
    this._dialog.open(DialogsComponent, {
      width: '25rem',
      height: '30rem',
      autoFocus: true,
    });
  }
}
