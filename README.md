## ⬇️ Instalacion de dependencias

Para instalar las dependencias necesarias debe ejecutar el comando: 
```
  npm install
```


‎ 
## 🌐 Aplicacion

Para correr la aplicacion debe ejecutar el comando:
```
  npm run start
```
Esta corre en el puerto `3000`.
Abre [http://localhost:3000](http://localhost:3000) para verlo en su navegador.


‎ 
## 💾 API Server (JSON Server)

Para correr la API debe ejecutar el comando: 
```
  npm run start-server
```
Este corre en el puerto `3001`.
Abre [http://localhost:3001/products](http://localhost:3001/products) para verlo en su navegador.


‎ 
## 📄 Documentación API
### JSON:

```javascript
{
  "products": [
    {
      "id": "1",
      "name": "name",
      "imageUrl": "url",
      "hidden": false
    },
    {
      "id": "2",
      "name": "name2",
      "imageUrl": "url2",
      "hidden": false
    },
    {
      "id": "3",
      "name": "name3",
      "imageUrl": "url3",
      "hidden": true
    }
  ]
}
```


‎ 
## 📂 Estructura de carpetas

### components
Esta carpeta alberga componentes reutilizables que pueden ser utilizados en múltiples partes de la aplicación. Por ejemplo, los encabezados, pies de página, botones personalizados, etc.

‎ 
### pages
Aquí se encuentran los componentes que representan diferentes páginas de la aplicación. Cada subcarpeta dentro de pages corresponde a una página específica de la aplicación. Por ejemplo, la página de inicio (Home), la página About, la página de "No encontrado" (NotFound), etc.

‎ 
### assets
Contiene recursos estáticos como imágenes, iconos, videos, fuentes, etc., utilizados en la aplicación.

‎ 
### services
Esta carpeta puede contener funciones y utilidades relacionadas con la lógica de negocio o la comunicación con servicios externos, como funciones para interactuar con una API, etc.

‎ 
### utils
Aquí se encuentran funciones y utilidades reutilizables que no están necesariamente ligadas a un componente específico. Por ejemplo, funciones de ayuda genéricas, constantes, etc.

‎ 
### styles
Contiene archivos de estilos para la aplicación. global.css puede contener estilos globales aplicados a toda la aplicación.


‎ 
## 🎨 Otras bibliotecas

En este proyecto, se utilizan algunas otras bibliotecas además de las dependencias principales.

 - [Bootstrap](https://getbootstrap.com/) - Proporciona una amplia gama de estilos predefinidos para crear interfaces de usuario receptivas y atractivas.

 - [SweetAlert2](https://sweetalert2.github.io/) - Facilita la creación de modales y alertas personalizadas, mejorando la experiencia del usuario al presentar mensajes y solicitudes de manera más atractiva.