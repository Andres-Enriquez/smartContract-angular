// SPDX-license-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract ParqueLaCana {
    
    // Instancia del contracto token
    ERC20Basic private token;
    // Cantidad de fechas a entregar
    uint private ficha = 0;
    // Direccion del propietario
    address public owner;
    // Direccion del contrato
    address private contrato;
    // Array para almacenar el nombre de las atracciones
    Atraccion [] private listaAtracciones;
    
    // Eventos
    event nuevaAtraccion(string, uint);
    event bajaAtraccion(string);
    event disfrutaAtraccion(string, uint, address);
    
    // Estrucuta de dato cliente
    struct Cliente {
        uint cantidaBoleta;
        uint ficha;
    }
    
    // Estructura de dato atraccion
    struct Atraccion {
        string nombre;
        uint ficha;
        bool estado;
    }
    
    // Obtener información del cliente
    mapping(address => Cliente) private clientes;
    // Mapping para relacion del nombre de la atraccion de una estructura de datos
    mapping(string => Atraccion) private atracciones;
    // Mapping para relacionar una identidad (cliente) con su historial de atracciones en el Parque de la caña
    mapping(address => string []) historialAtracciones;
    
    // Constructor
    constructor() {
        ficha = 5;
        token = new ERC20Basic(5000);
        owner = msg.sender;
        contrato = address(this);
    }
    
    // ------------------------- Modificadores ------------------------------------------
    
    // Modificador para controlar las funciones ejecutables por parque de la cana
    modifier unicamente(address _direccion) {
        require(_direccion == owner, "No tienes permisos para ejecutar esta funcion.");
        _;
    }
    
    // --------------------------- GESTION DE TOKENS Y BOLETA ----------------------------------------
    
    // Funcion para obtener la cantidad de tokens que posee el cliente
    function misTokens() public view returns(uint) {
        return token.balanceOf(msg.sender);
    }
    
    // Funcion para obtener la cantidad de tokens que posee el contrato
    function balanceToken() public view returns(uint) {
        return token.balanceOf(contrato);
    }
    
    // Funcion para determinar el precio de los tokens
    function precioTokens(uint _numTokens) internal pure returns (uint) {
        return _numTokens * (0.0002 ether);
    }
    
    // Funcion para determinar el precio de la boleta
    function precioBoleta(uint _numBoleta) internal pure returns (uint) {
        return _numBoleta * (0.00106 ether);
    }
    
    // Funcion que muestra la cantidad de ethers que posee el contrato
    function balanceEther() public view unicamente(msg.sender) returns(uint) {
        return address(this).balance;
    }
    
    
    // ------------------------- Logica parque la cana -------------------------//
    
    // Funcion para permitir al cliente comprar boleta
    function comprarBoleta(uint _numBoletas) public payable {
        // Establecer el precio de las boletas
        uint coste = precioBoleta(_numBoletas);
        // Se evalua el dinero que el cliente paga por los tokens
        require(msg.value >= coste, "Paga con mas ethers");
        //  Diferencia de lo que el cliente paga
        uint returnValue = msg.value - coste;
        // Parque de la caña retorna la cantidad de ethers al cliente
        payable(msg.sender).transfer(returnValue);
        // Obtener numero de token disponibles
        uint balance = balanceToken();
        // determina cuantos tokens entregar al cliente
        uint _numTokens = _numBoletas * ficha;
        // Verifica la disponibilidad de tokens
        require(_numTokens <= balance, "Comprar un numero menor de Tokens");
        // Se transfiere el numero de tokens al cliente
        token.transfer(msg.sender, _numTokens);
        // Actualizar numero de boletas comprados y tokens
        uint cantidaBoleta = clientes[msg.sender].cantidaBoleta + _numBoletas;
        uint cantidaFicha = clientes[msg.sender].ficha + _numTokens;
        clientes[msg.sender] = Cliente(cantidaBoleta,cantidaFicha);
    }
    
    // Mostrar informacion de la boleta al cliente
    function miBoleta() public view returns (Cliente memory) {
        return clientes[msg.sender];
    }
    
    // Crear nuevas atracciones para Parque de la cana (Solo es ejecutable por el Parque);
    function agregarAtraccion(string memory _nombreAtraccion, uint _precio) public unicamente(msg.sender) {
        Atraccion memory atracion = Atraccion(_nombreAtraccion, _precio, true);
        // Crear nueva atraccion
        atracciones[_nombreAtraccion] = atracion;
        // Almacenamiento en un array el nombre de la Atraccion
        listaAtracciones.push(atracion);
        // Emision del evento para la nueva Atraccion
        emit nuevaAtraccion(_nombreAtraccion, _precio);
    }
    
    // Funcion para subirse a una atraccion del parque y pagar en tokens
    function subirseAtraccion(string memory _nombreAtraccion) public {
        // Precio de la atraccion (en tokens);
        uint tokensAtraccion = atracciones[_nombreAtraccion].ficha;
        // Verifica el estado de la atraccion (si esta disponible para su uso);
        require(atracciones[_nombreAtraccion].estado == true, "La atraccion no esta disponible en estos momentos");
        // Verifica el numero de tokens que iene el cliente para subirse a la atraccion
        require(tokensAtraccion <= misTokens(), "No tienes suficiente tokens");
        // Envio de token al contrato
        token.transferParque(msg.sender, contrato, tokensAtraccion);
        // Almacenamiento en el historial de atracciones del cliente
        historialAtracciones[msg.sender].push(_nombreAtraccion);
        // Emision del evento para disfrutar de la atracciones
        emit disfrutaAtraccion(_nombreAtraccion, tokensAtraccion, msg.sender);
    }
    
    // Dar de baja a las atracciones del parque de la caña
    function suspenderAtraccion(string memory _nombreAtraccion) public unicamente(msg.sender) {
        // El estado de la atraccion pasa a FALSE => No esta en uso
        atracciones[_nombreAtraccion].estado = false;
        // Emision del evento para la baja de la atraccion
        emit bajaAtraccion(_nombreAtraccion);
    }
    
    // Visualizar las atracciones del parque de la caña
    function verAtraccionesDisponibles() public view returns (Atraccion [] memory) {
        return listaAtracciones;
    }
    
    // Visualiza el historial completo de atracciones disfrutadas por el cliente
    function historial() public view returns (string [] memory) {
        return historialAtracciones[msg.sender];
    }
    
    // Funcion que permite al propietario sacar ether del contrato(Ganancia) y enviarlo a su billetera
    function retirarDinero() public unicamente(msg.sender) payable {
        uint balance = balanceEther();
        require(balance > 0, "No tienes suficiente ether para retirar");
        address payable to = payable(owner);
        // Enviar ether a la billetera del propietario
        to.transfer(balanceEther());
    }
}