# SmartContract-angular
Es una Dapps de un parque de atracciones que permite a los clientes y al administrador realizar ciertas acciones

## Acciones del cliente:
- Conectarse a la billetera
- Comprar boleta (Por la compra de la boleta se le entrega 5 fichas o tokens)
- Ver la cantidad de fichas o tokens que posee
- Ver la cantidad de boletas que compro
- Ver historial de atracciones que ha montado el cliente
- Seleccionar la atraccion que desea montarse y pagar con las fichas o tokens

## Acciones del administrador:
- Crear nuevas atracciones
- Consultar el balance del contrato
- Retirar dinero del contrato y enviarlo a la cuenta del propietario

## Instalaciones necesarias
- web3: https://www.npmjs.com/package/web3
- web3modal: https://www.npmjs.com/package/web3modal
- crypto-browserify: https://www.npmjs.com/package/crypto-browserify
- https-browserify: https://www.npmjs.com/package/https-browserify
- os-browserify: https://www.npmjs.com/package/os-browserify
- stream-browserify: https://www.npmjs.com/package/stream-browserify
- stream-http: https://www.npmjs.com/package/stream-http
- assert: https://www.npmjs.com/package/assert
- @walletconnect/browser: https://www.npmjs.com/package/@walletconnect/browser
- @walletconnect/web3-provider: https://www.npmjs.com/package/@walletconnect/web3-provider

## Configuraciones
- en el archivo ```tsconfig.json``` agregar en el ```compilerOptions``` el ```paths```
```
"compilerOptions": {
        "paths" : {
        "crypto": ["./node_modules/crypto-browserify"],
        "stream": ["./node_modules/stream-browserify"],
        "assert": ["./node_modules/assert"],
        "http": ["./node_modules/stream-http"],
        "https": ["./node_modules/https-browserify"],
        "os": ["./node_modules/os-browserify"],
    }
 ```
 - en el archivo ```polyfills.ts``` agregar estas lineas de codigo
 ```
 import 'zone.js/dist/zone';  // Included with Angular CLI.
 
  (window as any).global = window;
  global.Buffer = global.Buffer || require('buffer').Buffer;
  global.process = require('process');
```
 - en el archivo ```angular.json``` agregar estas lineas de codigo debajo de ```scripts```
 ```
 "allowedCommonJsDependencies": 
 [
      "@walletconnect/window-metadata",
      "@walletconnect/socket-transport",
      "@walletconnect/environment",
      "@walletconnect/encoding",
      "@walletconnect/web3-provider",
      "query-string",
      "hash.js",
      "bn.js",
      "js-sha3",
      "web3"
 ]
 ```

## Referencias
- https://web3js.readthedocs.io/en/v1.4.0/web3-eth.html
- https://github.com/ChainSafe/web3.js
- https://github.com/Web3Modal/web3modal
- https://medium.com/upstate-interactive/how-to-connect-an-angular-application-to-a-smart-contract-using-web3js-f83689fb6909

