import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  usuario?: any;
  formCrear: FormGroup = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    username: [null, Validators.required],
    genero_usuario: [1, Validators.required],
    identificacion: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    cliente: [true],
  });

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearCuenta() {
    this.authSvc
      .crearCuenta({
        usuario: {
          ...this.formCrear.value,
        },
      })
      .pipe(
        catchError((error) => {
          this.snackbar.open(
            'Advertencia: ' + JSON.stringify(error.error.usuario)
          );
          return error;
        })
      )
      .subscribe((response: any) => {
        this.snackbar.open('Cuenta creada satisfactoriamente');
        if (response) {
          this.authSvc
            .iniciarSesion(this.formCrear.value)
            .subscribe((response: any) => {
              localStorage.setItem('auth_token', response.token);
              localStorage.setItem('token', JSON.stringify(response.token));
              localStorage.setItem('user', JSON.stringify(response.usuario));
              this.snackbar.open(
                'Bienvenido ' + JSON.stringify(response.usuario.nombres)
              );
              this.router.navigate(['/perfil']);
            });
        }
      });
  }
}
