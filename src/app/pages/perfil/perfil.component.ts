import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaBancaria } from 'src/app/core/interfaces/cuenta_bancaria';
import { ProductosService } from 'src/app/core/services/productos.service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { MatDialog } from '@angular/material/dialog';
import { CerrarSesionComponent } from 'src/app/shared/cerrar-sesion/cerrar-sesion.component';
CerrarSesionComponent;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: any;
  detallesCuentaBancaria!: CuentaBancaria;

  formSaldo: FormGroup = this.fb.group({
    usuario_cuenta: [null, Validators.required],
    saldo_cuenta: [null, Validators.required],
  });

  constructor(
    private ProductosSvc: ProductosService,
    private fb: FormBuilder,
    private _dialog: MatDialog
  ) {
    this.usuario = JSON.parse(localStorage.getItem('user')!)
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
  }

  ngOnInit(): void {
    this.getDetalleCuentaBancaria();
    this.formSaldo.controls['usuario_cuenta'].setValue(this.usuario.id);
  }

  getDetalleCuentaBancaria() {
    this.ProductosSvc.detalleCuentabancaria().subscribe((response: any) => {
      this.detallesCuentaBancaria = response;
    });
  }

  crearCuentaBancaria() {
    this.ProductosSvc.crearCuentaBancaria(this.formSaldo.value).subscribe(
      (response: any) => {
        this.detallesCuentaBancaria = response;
      }
    );
  }

  crearConsignacion() {
    this._dialog.open(DialogsComponent, {
      width: '25rem',
      height: '30rem',
      autoFocus: true,
    });
  }
}
