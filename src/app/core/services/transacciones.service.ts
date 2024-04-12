import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})

export class TransaccionesService {
  constructor(private http: HttpClient) {}

  consignarSaldoCuentaBancaria(data: any) {
    return this.http.patch(
      `${environment.api_bancaria}api/prod/transa-bancaria/consignar-dinero/`,
      data
    );
  }

  retirarSaldoCuentaBancaria(data: any) {
    return this.http.patch(
      `${environment.api_bancaria}api/prod/transa-bancaria/retirar-dinero/`,
      data
    );
  }
}
