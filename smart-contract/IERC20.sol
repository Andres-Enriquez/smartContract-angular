// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface de nuestro token ERC20
interface IERC20 {
    
    // Devuelve la cantidad de tokens en existencia
    function totalSupply() external view returns (uint256);
    
    // Devulve la cantidad de tokens para una dirección indicada por parametro
    function balanceOf(address account) external view returns(uint256);
    
    // Devuelve el numero de token que el spender podra gastar en nombre del propietario (owner)
    function allowance(address owner, address spender) external view returns(uint256);
    
    // Indica si se puede llevar a cabo o no una transferencia retorna un booleano(true: si se puede, false: no se puede)
    function transfer(address recipient, uint256 amount) external returns (bool);
    
    // Devuelve un valor booleano resultado de la operación indicada
    function transferParque(address cliente, address recipient, uint256 amount) external returns(bool);
    
    // Devuelve un valor booleano con el resultado de la operación de gasto
    function approve(address spender, uint256 amount) external returns (bool);
    
    // Devuelve un valor booleano con el resultado de la operacion de paso de una cantidad de tokens usando el metodo allowance()
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    // Evento que se debe emitir cuando una cantidad de tokens pase de un origen a un destino
    event eventTransfer(address indexed from, address indexed to, uint256 value);
    
    // Evento que se debe emitir cuando se establecer una asignacion con el metodo allowance()
    event eventApproval(address indexed owner, address indexed spender, uint256 value);
    
}