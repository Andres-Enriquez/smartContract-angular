// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./SafeMath.sol";

// Implementacion de las funciones del token ERC20
contract ERC20Basic is IERC20 {
    
    // Usando la libreria para evitar desbordamiento
    using SafeMath for uint256;
    
    // Nombre de la moneda o el token
    string public constant name = "PARQUE";
    // Simbolo que representa la moneda o el token
    string public constant symbol = "PRU";
    uint8 public constant decimals = 2;
    
    // Indica que cada direccion le corresponde una cantidad de token
    mapping(address => uint256) balances;
    // Indica que el propietario ha cedido ciertos tokens a un conjunto de direcciones y cada uno de ellos solo puede gastar
    // la cantidad de token que le cedio el propietario
    mapping(address => mapping(address => uint)) allowed;
    // total de tokens
    uint256 totalSupply_;
    
    
    constructor (uint256 initialSupply) {
        // estableciendo la cantidad de tokens
        totalSupply_ = initialSupply;
        // Propietario de la moneda virtual (Aqui es donde se creo la moneda virtual)
        balances[msg.sender] = totalSupply_;
    }
    
    
    // Metodo para obtener la cantidad de tokens del contrato
    function totalSupply() public override view returns(uint256) {
        return totalSupply_;
    }
    
    // Metodo para obtener la cantidad de token que posee una determinada direccion
    function balanceOf(address tokenOwner) public override view returns(uint256) {
        return balances[tokenOwner];
    }
    
    // Metodo para agregar nuevo tokens
    function increaseTotalSupply(uint newTokensAmount) public {
        totalSupply_ += newTokensAmount;
        balances[msg.sender] += newTokensAmount;
    }
    
    // Metodo que permite ver la cantidad de tokens que le cedio el Propietario a la persona delegada
    function allowance(address owner, address delegate) public override view returns(uint256) {
        return allowed[owner][delegate];
    }
    
    // Metodo que permite transferir una cantidad de tokens al receptor por parte del emisor que posee los tokens
    function transfer(address recipient, uint256 numTokens) public virtual override returns (bool) {
        _transfer(msg.sender, recipient, numTokens);
        return true;
    }
    
    function transferParque(address _client, address recipient, uint256 numTokens) public virtual override returns (bool) {
        _transferParque(_client, recipient, numTokens);
        return true;
    }
    
    // Metodo que permite al propietario aprobar que el delegado pueda gastar cierta cantidad de token que le cedio el propietario
    function approve(address delegate, uint256 numTokens) public virtual override returns (bool) {
        _approve(msg.sender, delegate, numTokens);
        return true;
    }
    
    // Metodo que permite servir de intermediario entre el comprador y vendedor de transferir la cantidad de tokens
    function transferFrom(address owner, address buyer, uint256 numTokens) public virtual override returns (bool) {
        _transferFrom(owner, buyer, numTokens);
        return true;
    }
    
    
    function _transferParque(
        address _client,
        address recipient,
        uint256 numTokens) internal virtual {
        require(numTokens <= balances[_client]);
        balances[_client] = balances[_client].sub(numTokens);
        balances[recipient] = balances[recipient].add(numTokens);
        emit eventTransfer(_client, recipient, numTokens);
    }
    
    function _transfer(
        address sender,
        address recipient,
        uint256 numTokens
    ) internal virtual {
        // Verifica si el emisor posee la cantidad de tokens necesario para enviar de lo contrario no podra enviar tokens
        require(numTokens <= balances[sender]);
        // Restamos la cantidad de tokens que va a enviar el emisor(Propietario del token) al receptor;
        balances[msg.sender] = balances[sender].sub(numTokens);
        // Sumamos la cantidad de token de recibe el receptor
        balances[recipient] = balances[recipient].add(numTokens);
        // Emite el evento donde notifica la cantidad de tokens que se transfirio por parte del emisor al receptor
        emit eventTransfer(msg.sender, recipient, numTokens);
    }
    
    function _approve(
        address owner,
        address delegate,
        uint256 numTokens
    ) internal virtual {
        allowed[owner][delegate] =  numTokens;
        emit eventApproval(msg.sender, delegate, numTokens);
    }
    
    function _transferFrom(
        address owner,
        address buyer,
        uint256 numTokens
    ) internal virtual {
        // Validamos que el propietario disponga de cierta cantidad de tokens
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        // Restar la cantidad de tokens que el propietario va vender
        balances[owner] = balances[owner].sub(numTokens);
        // Restar la cantidad de tokens como intermediario
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        // Agregar la cantidad de token al comprador
        balances[buyer] = balances[buyer].add(numTokens);
        emit eventTransfer(owner, buyer, numTokens);
    }
}