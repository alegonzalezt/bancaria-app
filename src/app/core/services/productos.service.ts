import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})

export class ProductosService {
  constructor(private http: HttpClient) {}

  crearCuentaBancaria(data: any) {
    return this.http.post(
      `${environment.api_bancaria}api/prod/cuenta-bancaria/registro-cuenta/`,
      data
    );
  }

  detalleCuentabancaria() {
    return this.http.get(
      `${environment.api_bancaria}api/prod/cuenta-bancaria/detalle-cuenta/`
    );
  }
}
