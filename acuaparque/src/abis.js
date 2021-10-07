export const token_address_contract = '0xE6c7f7e518568172988115926B1edC79c443E498';
export const token_address_owner = '0xE6172AE0E902F9e235229F3cDBC300980B25407F';
export const token_abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "bajaAtraccion",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "disfrutaAtraccion",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "nuevaAtraccion",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_nombreAtraccion",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_precio",
                "type": "uint256"
            }
        ],
        "name": "agregarAtraccion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "balanceEther",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "balanceToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_numBoletas",
                "type": "uint256"
            }
        ],
        "name": "comprarBoleta",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "historial",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "miBoleta",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "cantidaBoleta",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ficha",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ParqueLaCana.Cliente",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "misTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "retirarDinero",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_nombreAtraccion",
                "type": "string"
            }
        ],
        "name": "subirseAtraccion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_nombreAtraccion",
                "type": "string"
            }
        ],
        "name": "suspenderAtraccion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "verAtraccionesDisponibles",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "nombre",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ficha",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "estado",
                        "type": "bool"
                    }
                ],
                "internalType": "struct ParqueLaCana.Atraccion[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]