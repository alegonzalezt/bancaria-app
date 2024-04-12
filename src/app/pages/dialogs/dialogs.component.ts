import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { TransaccionesService } from 'src/app/core/services/transacciones.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
})
export class DialogsComponent implements OnInit {
  formConsignar: FormGroup = this.fb.group({
    numero_cuenta: [null, Validators.required],
    saldo: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private _dialog: MatDialogRef<DialogsComponent>,
    private TransaccionesSvc: TransaccionesService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  enviarSaldo() {
    this.TransaccionesSvc.consignarSaldoCuentaBancaria(this.formConsignar.value)
      .pipe(
        catchError((error) => {
          this.snackbar.open('Advertencia: ' + error.error.mensaje);
          return error;
        })
      )
      .subscribe((response: any) => {
        this.snackbar.open(response.mensaje);
        setTimeout(() => {
          this.refresh();
          this._dialog.close();
        }, 2000);
      });
  }

  refresh(): void {
    window.location.reload();
  }
}
