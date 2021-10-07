// Modulos de angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Servicios
import { AlertService } from 'src/app/service/alerts/alert.service';
import { ContractService } from 'src/app/service/contract/contract.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent implements OnInit {
  public balance: number;

  // Formulario agregar atracción
  public addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ficha: new FormControl('', Validators.required),
  });

  // Formulario suspender atracción
  public suspendForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private _contract: ContractService,
    private _alert: AlertService
  ) {
    this.balance = 0;
  }

  ngOnInit(): void {}

  // Funcion para permitir al usuario conectarse a los proveedores de billetera
  public conectar() {
    this._contract.connectAccount();
  }

  // Agregar nueva atracción
  public async addGame() {
    // Verificar si la cuenta tiene autorización
    if (await this._contract.checkAccount()) {
      const nombre = String(this.addForm.get('name')?.value)
        .trim()
        .toUpperCase();
      const ficha = this.addForm.get('ficha')?.value;
      this._contract.addGame(nombre, ficha);
    }
  }

  // Obtener balance del contrato (ether);
  public async getBalance() {
    // Verificar si la cuenta tiene autorización
    if (await this._contract.checkAccount()) {
      this._contract
        .getBalance()
        .then((res) => {
          this.balance = Number(res);
          if (this.balance == 0) {
            this._alert.showMessageWarning(
              'Contrato: 0',
              'No tienes ether en el contrato'
            );
            return;
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }

  // Depositar dinero a la cuenta de propietario
  public async depositAccount() {
    // Verificar si la cuenta tiene autorización
    if (await this._contract.checkAccount()) {
      this._contract.sendEther();
    }
  }
}
