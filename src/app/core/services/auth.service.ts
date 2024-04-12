import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private usuario = new BehaviorSubject<any>(null);

  usuario$ = this.usuario.asObservable();
  constructor(
    private http: HttpClient
  ) {}

  isLoged() {
    if (localStorage.getItem('auth_token')) {
        this.usuario.next(JSON.parse(localStorage.getItem('usuario')!));
      return true;
    }
    return false;
  }

  iniciarSesion(data: any) {
    return this.http.post(
      `${environment.api_bancaria}api/user/usuarios-sesion/iniciar-sesion/`,
      data
    );
  }

  cerrarSesion() {
    return this.http.get(
      `${environment.api_bancaria}api/user/usuarios-sesion/cierre-sesion/`,
    );
  }

  crearCuenta(data: any) {
    return this.http.post(
      `${environment.api_bancaria}api/user/usuarios-registro/`,
      data
    );
  }

  getUser() {
    return localStorage.getItem('user');
  }
}
