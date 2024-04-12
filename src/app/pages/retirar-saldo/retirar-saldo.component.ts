import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CuentaBancaria } from 'src/app/core/interfaces/cuenta_bancaria';
import { ProductosService } from 'src/app/core/services/productos.service';
import { TransaccionesService } from 'src/app/core/services/transacciones.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-retirar-saldo',
  templateUrl: './retirar-saldo.component.html',
  styleUrls: ['./retirar-saldo.component.css'],
})
export class RetirarSaldoComponent implements OnInit {
  detallesCuentaBancaria!: CuentaBancaria;

  formRetiro: FormGroup = this.fb.group({
    numero_cuenta: [null, Validators.required],
    saldo: [null, Validators.required],
  });

  constructor(
    private ProductosSvc: ProductosService,
    private TransaccionesSvc: TransaccionesService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDetalleCuentaBancaria();
  }

  getDetalleCuentaBancaria() {
    this.ProductosSvc.detalleCuentabancaria().subscribe((response: any) => {
      this.detallesCuentaBancaria = response;
      this.formRetiro.controls['numero_cuenta'].setValue(
        this.detallesCuentaBancaria.numero_cuenta
      );
    });
  }

  retirarSaldo() {
    this.TransaccionesSvc.retirarSaldoCuentaBancaria(this.formRetiro.value)
      .pipe(
        catchError((error) => {
          this.snackbar.open('Advertencia: ' + error.error.mensaje);
          return error;
        })
      )
      .subscribe((response: any) => {
        this.snackbar.open(response.mensaje);
        setTimeout(() => {
          this.router.navigate(['/perfil']);
        }, 2000);
      });
  }
}
