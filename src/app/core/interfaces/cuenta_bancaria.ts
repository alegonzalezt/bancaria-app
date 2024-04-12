export interface Usuario {
  id: number;
  nombre_completo: string;
}

export interface CuentaBancaria {
  id: number;
  usuario_cuenta: number;
  usuario: Usuario;
  numero_cuenta: number;
  saldo_cuenta?: number;
  estado_cuenta: boolean;
  fecha_creacion: Date;
}
