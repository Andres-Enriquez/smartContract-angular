import { Injectable } from '@angular/core';
// Libreria de alertas
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // Mostrar alerta exitosa
  showMessageSuccess(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'success',
      timer: 10000
    });
  }

  // Mostrar alerta de advertencia
  showMessageWarning(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'warning'
    });
  }

  // Mostrar alerta de información
  showMessageInfo(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'info'
    });
  }


  // Mostrar alerta de error
  showMessageError(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'error'
    });
  }

  // Mostrar alerta en espera
  showWaitAlert(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
  }

  closeAlert(): void {
    Swal.close();
  }

  // Mostrar alerta de confirmación
  async alertConfirmation(title: string, text: string, textConfirm: string) {
  return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: textConfirm,
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
  }
}
