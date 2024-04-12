import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css'],
})
export class CerrarSesionComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  cerrarSesion() {
    this.AuthService.cerrarSesion().subscribe((response: any) => {
      this.snackbar.open('Sesión finalizada con exito.');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
