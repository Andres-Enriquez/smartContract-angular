// Modulos de angular
import { Component, OnInit } from '@angular/core';
// Servicio
import { ContractService } from 'src/app/service/contract/contract.service';

@Component({
  selector: 'app-atraccion',
  templateUrl: './atraccion.component.html',
  styleUrls: ['./atraccion.component.css'],
})
export class AtraccionComponent implements OnInit {
  // Numero de boleta o tiquetes
  public ticket: number;
  // Cantidad de tokens o fichas del contrato
  public fichaContrato: number;
  // Cantidad de de fichas que posee el usuario
  public fichaUsuario: number;
  // Nombre de la atraccion que selecciona el usuario
  public atraccion: string;
  // Numero de boletas que compro el usuario
  public cantidadBoleta: number;
  // Lista de atracciones
  public listGame: any[];
  // Historial de atracciones
  public historyGame: any[];

  constructor(public _contract: ContractService) {
    // Inicialización de variables
    this.fichaContrato = 0;
    this.fichaUsuario = 0;
    this.ticket = 0;
    this.cantidadBoleta = 0;
    this.listGame = [];
    this.historyGame = [];
    this.atraccion = '';
  }

  ngOnInit(): void {
    // Si tiene cuenta recargar los datos
    if (this._contract.accounts != undefined) {
      this.getData();
    }
  }

  /************* Logica del componente ***************************/

  // Funcion para establecer numero de boletas a comprar
  public addTicket() {
    this.ticket++;
  }

  // Funcion para disminuir las boletas a comprar
  public decreaseTicket() {
    if (this.ticket > 0) {
      this.ticket--;
    }
  }

  // Funcion para permitir al usuario conectarse a los proveedores de billetera
  public conectar() {
    this._contract.connectAccount().then(() => {
      this.getData();
    });
  }

  // Funcion para permitir al usuario comprar boleta o tiquete
  public buyTicket() {
    if (this.ticket > 0) {
      this._contract.buyTicket(this.ticket).then(() => {
        this.getData();
      });
    }
  }

  // Funcion para escuchar la atracción que selecciono el usuario
  public onChangeGame(event: any): void {
    this.atraccion = event.target.value;
  }

  // Funcion para obtener la lista de atraciones
  public getListGame() {
    this._contract.listGame().then((res) => {
      this.listGame = res;
    });
  }

  // Funcion para montarse en la atracción
  public rideGame() {
    this._contract.rideGame(this.atraccion).then((res) => {
      this.getTokens();
      this.getMyTokens();
      this.getHistory();
    });
  }

  // Funcion para obtener la cantidad de tokens que posee el contrato
  private getTokens() {
    this._contract.getTokens().then((res) => {
      this.fichaContrato = Number(res);
    });
  }

  // Funcion para obtener la cantidad de tokens que posee el usuario
  private getMyTokens() {
    this._contract.getMyTokens().then((res) => {
      this.fichaUsuario = Number(res);
    });
  }

  // Funcion para obtener la cantidad de boletas o tiquetes que compro
  private getTicket() {
    this._contract.getTicket().then((res) => {
      this.cantidadBoleta = Number(res);
    });
  }

  // Funcion para obtener el historial de atracciones disfrutadas por el cliente
  private getHistory() {
    this.historyGame = [];
    this._contract.getHistoryGame().then((res) => {
      // Obtener una lista de atraciones unicas
      const unicos = [...new Set(res)];
      // Recorrer las atracciones para establecer información
      unicos.forEach((item) => {
        this.historyGame.push({ nombre: item, cantidad: 0 });
      });

      // Establecer contador de las atracciones montadas
      res.forEach(async (item) => {
        this.historyGame.filter((x) => {
          if (x.nombre == item) {
            x.cantidad++;
          }
        });
      });
    });
  }

  // Actualizar los tokens del contrato y del usuario
  private getData() {
    this.getTokens();
    this.getMyTokens();
    this.getTicket();
    this.getListGame();
    this.getHistory();
  }
}
