# Prueba Teórica para el Puesto de Programador Web3/DApps

## Objetivo de la Prueba

El objetivo de esta prueba es desarrollar la parte frontend de una aplicación Web3 que interactúe con un smart contract previamente desarrollado. 
Junto a este documento, se entregará el código fuente del proyecto en Hardhat, que incluye el smart contract y una prueba para validar las funciones del contrato.


## Descripción del Smart Contract

El smart contract es un juego de apuestas que permite a los usuarios realizar apuestas en un rango de números del 0 al 15. 
Los usuarios pueden interactuar con el contrato para realizar sus apuestas y, al final de cada ronda, se determina un ganador. 
El contrato almacena la dirección de los ganadores en un array público llamado lastWinners.


## Funciones Principales del Smart Contract

### Realizar Apuesta: 

Permite a los usuarios realizar una apuesta especificando el valor de la apuesta y el número elegido.


### Determinar Ganador: 

Al final de cada ronda, el contrato determina el ganador y actualiza el array lastWinners.


### Consultar Ganadores: 

Los usuarios pueden consultar la lista de ganadores a través de la función pública generada automáticamente para el array lastWinners.


## Requisitos del Proyecto

El candidato deberá desarrollar un proyecto utilizando el framework de su elección (React, Vue, Angular, etc.) que interactúe con el smart contract. 
La aplicación debe permitir a los usuarios conectarse a su wallet (preferiblemente MetaMask) y realizar apuestas.


## Funcionalidades Requeridas

### Integración con Wallet: 

La DApp debe permitir a los usuarios conectarse a su wallet, preferiblemente MetaMask, pero se valorará la posibilidad de conectarse a otros tipos de wallets.


### Diseño de la DApp: 

La interfaz debe tener un diseño que refleje el look and feel de las aplicaciones DApp. Se valorará la creatividad en la interfaz de usuario.


## Interacción del Usuario: 

Desde la interfaz, el usuario debe poder conectarse a la DApp con su wallet, realizar su apuesta, ingresar el valor de su apuesta y seleccionar un número del 0 al 15.


## Validación de Campos: 

Se deben aplicar validaciones a los campos de entrada de la DApp, incluyendo:
- Valores mínimos y máximos para las apuestas.
- Validación para evitar letras en campos numéricos.
- Comprobación de campos nulos.


## Dashboard de Estado del Juego: 

La DApp debe mostrar el estado del juego, incluyendo:
- La ronda actual.
- Los ganadores de rondas anteriores.


## Rubrica de Evaluación


| Criterio                           | Descripción                                                                 | Puntuación |
|------------------------------------|-----------------------------------------------------------------------------|------------|
| Integración con Wallet             | Conexión exitosa con MetaMask y/o otras wallets.                            | 20         |
| Creatividad en la Interfaz         | Innovación y originalidad en el diseño de la interfaz de usuario.           | 20         |
| Interacción del Usuario            | Facilidad de uso para realizar apuestas y seleccionar números.              | 10         |
| Validación de Campos               | Implementación de validaciones adecuadas en los campos de entrada.          | 10         |
| Dashboard de Estado del Juego      | Presentación clara del estado del juego y ultimos ganadores.                | 20         |
| Claridad en el codigo (clean code) | Codigo testeable y mantenible.                                              | 20         |
| Monitoreo de Eventos               | Implementación de monitoreo del log de eventos y actualizacion de la pagina | 20 (bonus) |
| Despliegue en Testnet              | Contrato desplegado en una testnet para pruebas públicas.                   | 20 (bonus) |
| Despliegue de la DApp              | DApp desplegada en Vercel u otro servicio de nube gratuito.                 | 20 (bonus) |

**Puntuación Total:** 
El puntaje maximo alcanzable es 160 puntos, pero los tres ultimos criterios son opcionales,  

## Entrega

El candidato deberá entregar el código fuente de la DApp junto con instrucciones claras sobre cómo ejecutar la aplicación y conectarse al smart contract. Se valorará la claridad y la organización del código.

Si tienes alguna pregunta o necesitas más detalles, no dudes en preguntar. ¡Buena suerte!

