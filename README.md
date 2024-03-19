# Super Exchange Rate

## Descripción
Super Exchange Rate es una aplicación web responsive diseñada para permitir a los usuarios consultar tipos de cambio, agregar cambios favoritos y realizar transferencias utilizando un tipo de cambio favorito. Construido con Angular v16, ofrece una experiencia de usuario fluida y funcionalidades ricas para la gestión de divisas.

## Tecnologías
- Angular v16
- Angular material
- RxJS
- ESLint


## Instalación
Para ejecutar este proyecto en tu máquina local, necesitarás Node.js con la versión 16.20.0 o superiores y Angular CLI.
Una vez instalados, sigue estos pasos:

```bash
git clone https://github.com/kevip/super-exchange-rate.git
cd super-exchange-rate
npm install
ng serve
```

## Lineamientos técnicos

### Pruebas unitarias
Las pruebas unitarias están escritas en Jasmine Y siguen el patrón AAA(Arrange, Act, Assert).

Cada test es único e independiente y solo se tiene un expect por cada caso.

La estructura de los test cases es la siguiente:

```js
describe('when <caso de prueba>', () => {
    it('should <descripción de caso de prueba>' () => {
      // Arrange
      ...
      // Act
      ...
      // Assert
      ...
    });
});
```

### Commits:
El formato de los mensajes de los commits tienen la siguiente estructura:
```bash
git commit -m "<tipo de commit>: <descripción del commit>"
```
Se tomó como referencia la siguiente convención: https://www.conventionalcommits.org/en/v1.0.0/
