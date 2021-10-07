// Modulo de angular
import { Injectable } from '@angular/core';
// Modulo web3Modal nos permite agregar multiple proveedores en nuestra aplicacion (MetaMask,Dapper,Formatic)
import Web3Modal from 'web3modal';
// Modulo web3 nos permite nos permite conectarnos a etgereyn
import Web3 from 'web3';
// Modulos para implementar
import * as WalletConnectProvider from '@walletconnect/web3-provider';
// Importando nuestro token
import {
  token_address_contract,
  token_address_owner,
  token_abi,
} from 'src/abis.js';

// Servicio
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  // Url de prueba de ethereum
  public rinkeby: string;
  // Direccion del contrato
  public addressContract: string;
  // Direccion del propietario
  public addressOwner: string;
  // Ethereum
  private web3js: Web3;
  // Proveedores de aplicaciones (Metamasl,Dapp etc..)
  private _web3Modal: Web3Modal;
  // Proveedor
  private provider: any;
  // Cuenta del usuario
  public accounts: any;
  // Realizar peticiones
  private apiCall: any;

  // Inicialización del servicio
  constructor(private _alert: AlertService) {
    this.web3js = new Web3();
    this._web3Modal = new Web3Modal();
    this.rinkeby = `https://rinkeby.etherscan.io/address/${token_address_contract}`;
    this.addressContract = token_address_contract;
    this.addressOwner = token_address_owner;
    // Establecer configuraciones
    this.initConfig();
  }

  // Establecer configuracion del proveedor
  async initConfig() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID', // required
        },
      },
    };

    this._web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)',
      },
    });
  }

  // Funcion que permite conectar a los proveedore de billetera
  async connectAccount() {
    // Restablecer el proveedor en cache
    this._web3Modal.clearCachedProvider();
    // conectarnos al proveedor
    this.provider = await this._web3Modal.connect();
    // Creando nueva instancia con el proveedor a conectar
    this.web3js = new Web3(this.provider);
    // Obtener la dirección del usuario
    this.accounts = await this.web3js.eth.getAccounts();
  }

  // Consultar los tokens que posee el contrato
  async getTokens() {
    await this.restart();
    const res = await this.apiCall.methods
      .balanceToken()
      .call()
      .catch((err) => {
        console.error(err);
      });
    return res;
  }

  // Consultar los tokens que posee el usuario
  async getMyTokens() {
    await this.restart();
    const res = await this.apiCall.methods
      .misTokens()
      .call({ from: this.accounts[0] })
      .catch((err) => {
        console.error(err);
      });
    return res;
  }

  // Obtener el balance del contrato de dinero(ether)
  async getBalance() {
    try {
      await this.restart();
      const res = await this.apiCall.methods
        .balanceEther()
        .call({ from: this.accounts[0] });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // Enviar dinero a la cuenta del propietario
  async sendEther() {
    try {
      // Verificar el balance
      const balance = await this.getBalance();
      if (balance == 0) {
        this._alert.showMessageWarning(
          'Contrato: 0',
          'No tienes ether en el contrato para retirar'
        );
        return;
      }

      await this.apiCall.methods
        .retirarDinero()
        .send({
          from: this.accounts[0], // account address
          gas: '3000000',
          gasPrice: '30000000000',
        })
        .once('transactionHash', (hash: string) => {
          this._alert.showWaitAlert();
        })
        .once('receipt', (receipt: any) => {
          this._alert.showMessageSuccess(
            'Transaccion exitosa',
            'Se envio ether a la cuenta'
          );
        });
    } catch (error: any) {}
  }

  // Funcion para permitir al usuario comprar la boleta o tiquete
  async buyTicket(ticket: number) {
    await this.restart();
    // Precio a pagar en la red
    const price = String((ticket * 0.00106).toPrecision(6));
    await this.apiCall.methods
      .comprarBoleta(String(ticket))
      .send({
        from: this.accounts[0], // account address
        gas: '3000000',
        gasPrice: '30000000000',
        value: this.web3js.utils.toWei(price, 'ether'),
      })
      .once('transactionHash', (hash: string) => {
        this._alert.showWaitAlert();
      })
      .once('receipt', (receipt: any) => {
        this._alert.showMessageSuccess(
          'Transaccion exitosa',
          `Cantidad de boletas ${ticket}`
        );
      });
  }

  // Agregar atraccion por el propietario
  async addGame(nombre: string, ficha: number) {
    try {
      await this.restart();
      // Invocando la funcion del contrato para agregar nueva atracción
      await this.apiCall.methods
        .agregarAtraccion(nombre, ficha)
        .send({
          from: this.accounts[0], // account address
          gas: '3000000',
          gasPrice: '30000000000',
        })
        .once('transactionHash', (hash: string) => {
          this._alert.showWaitAlert();
        })
        .once('receipt', (receipt: any) => {
          // Mostrar alerta exitosa al usuario
          this._alert.showMessageSuccess('Nueva Atracción', 'Creada con éxito');
        });
    } catch (error) {
      // Cerrar alerta
      this._alert.closeAlert();
      // Indica que ocurrio algo con el contrato
      console.error(error);
    }
  }

  // Permitir al usuario subirse a la atracción si dispone de fichas o tokens
  async rideGame(nombre: string) {
    try {
      await this.restart();
      // Invocando la funcion del contrato para agregar nueva atracción
      await this.apiCall.methods
        .subirseAtraccion(nombre)
        .send({
          from: this.accounts[0], // account address
          gas: '3000000',
          gasPrice: '30000000000',
        })
        .once('transactionHash', (hash: string) => {
          this._alert.showWaitAlert();
        })
        .once('receipt', (receipt: any) => {
          // Mostrar alerta exitosa al usuario
          this._alert.showMessageSuccess(
            'Gracias',
            'Por preferirnos y disfrutar de la atracción'
          );
        });
      return;
    } catch (error) {
      // Cerrar alerta
      this._alert.closeAlert();
      // Indica que ocurrio algo con el contrato
      this._alert.showMessageWarning('Ficha insuficientes','Debes tener fichas para subirse a la atraccion');
    }
  }

  // Obtener la lista de atracciones
  async listGame() {
    try {
      await this.restart();
      // Invocando la funcion del contrato para agregar nueva atracción
      const res = await this.apiCall.methods
        .verAtraccionesDisponibles()
        .call({ from: this.accounts[0] })
        .catch((err) => {
          console.error(err);
        });
      return res;
    } catch (error) {
      // Cerrar alerta
      this._alert.closeAlert();
      // Indica que ocurrio algo con el contrato
      console.error(error);
    }
  }

  // Obtener la cantidad de boleta que posee el usuario
  async getTicket() {
    await this.restart();
    const res = await this.apiCall.methods
      .miBoleta()
      .call({ from: this.accounts[0] })
      .catch((err) => {
        console.error(err);
      });
    return res.cantidaBoleta;
  }

  // Obtener el historial de juegos montados por el usuario
  async getHistoryGame() {
    try {
      await this.restart();
      const res = await this.apiCall.methods
        .historial()
        .call({ from: this.accounts[0] });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  // Reiniciar la cuenta del usuario para conectarse al proveedor de la billetera
  async restart() {
    // conectarnos al proveedor
    this.provider = await this._web3Modal.connect();
    // Creando nueva instancia con el proveedor a conectar
    this.web3js = new Web3(this.provider);
    // Obtener la dirección del usuario
    this.accounts = await this.web3js.eth.getAccounts();
    // Conectarnos al contrato
    this.apiCall = new this.web3js.eth.Contract(
      token_abi,
      token_address_contract
    );
  }

  // verificar si tiene permiso la cuenta para acceder a las funciones
  public async checkAccount(): Promise<boolean> {
    await this.restart();
    if (this.accounts[0] != this.addressOwner) {
      this._alert.showMessageWarning(
        'No tiene autorización',
        'Solamente el propietario puede realizar las operaciones'
      );
      return false;
    }
    return true;
  }
}
