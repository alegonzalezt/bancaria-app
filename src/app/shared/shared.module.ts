import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';

@NgModule({
  declarations: [CerrarSesionComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDatepickerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MatDatepickerModule, MaterialModule, CerrarSesionComponent],
})
export class SharedModule {}
