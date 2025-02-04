# Gestión Veterinaria 🐶 🐈
---
La app web permitirá gestionar clientes y sus respectivas mascotas, aplicando la lógica básica de CRUD para cada una sola entidad y un filtro por cliente para las mascotas.

## Características
---
1. Registro e inicio de sesión con autenticación JWT
2. CRUD de mascotas: crear, consultar actualizar y eliminar informacion de alguna mascota. También filtra mascotas por cliente
3. CRUD de clientes: crear, consultar actualizar y eliminar informacion de algun cliente.
4. En este proyecto utilicé Vite para React, Redux Toolkit para la gestión del estado, React Router DOM para la navegación y Tailwind UI para el diseño de la interfaz de usuario. 

# Pasos para usar este proyecto 

1. Clonar el repositorio ``` https://github.com/TebyMartin/app-mascota.git ```

2. Instalar las dependencias ```npm install```
3. Ejecutar el servidor ``` npm run dev```. 
4. Crearse un usuario (descripción mas adelante)
5. Iniciar sesión
6. Tambien puede usarse el link desplegado en Vercel para probar los endpoints https://app-mascota.vercel.app/

## Estructura del Proyecto

```plaintext
src/
├── components/        # Componentes reutilizables del proyecto
│   ├── alerta/         # Componentes relacionados con alertas
│   ├── cliente/        # Componentes relacionados con clientes
│   ├── footer/         # Footer del proyecto
│   ├── formulario/    # Formularios generales
│   ├── formularioMascota/ # Formularios específicos para mascotas
│   ├── header/         # Header del proyecto
│   ├── listadoClientes/ # Componentes para listar clientes
│   ├── listadoMascotas/ # Componentes para listar mascotas
│   └── mascota/        # Componentes relacionados con mascotas
│       └── Mascota.jsx   # Componente principal de mascota
├── hooks/             # Hooks personalizados
│   ├── useCliente.jsx # Hook para gestionar clientes
│   └── useMascota.jsx # Hook para gestionar mascotas
├── layout/            # Componentes de disposición
│   ├── authLayout.jsx   # Layout para autenticación
│   └── RutaProtegida.jsx # Layout para rutas protegidas
├── paginas/           # Páginas principales del proyecto
│   ├── administrarClientes/ # Administración de clientes
│   ├── administrarMascotas/ # Administración de mascotas
│   ├── login/             # Página de inicio de sesión
│   └── registrar/         # Página de registro
├── store/             # Configuración de Redux
│   ├── slices/           # Slices de Redux
│   └── store.js         # Configuración general del store
├── App.jsx           # Componente principal de la aplicación
├── index.css         # Estilos globales
├── main.jsx         # Punto de entrada principal
```

## Endpoints principales 
---
Usuario:
---

| Método   | Endpoints    | Descripción                         |
|----------|--------------|-------------------------------------|
| POST     | `/registro`  | Realizar un registro                |
| POST     | `/login`     | Iniciar sesión                      |
| GET      | `/perfil`    | Perfil de usuario                   |


Cliente:
---
| Método   | Endpoints    | Descripción                         |
|----------|--------------|-------------------------------------|
| GET      | `/cliente`   | Obtiene todos los clientes.         |
| GET      | `/cliente/:id`| Obtiene un cliente por su ID.       |
| POST     | `/cliente`    | Crea un nuevo cliente.              |
| PUT      | `/cliente/:id`| Actualiza los datos de un cliente.  |
| DELETE   | `/cliente/:id`| Elimina un cliente por su ID.       |


Mascota:
---

| Método   | Endpoints      | Descripción                         |
|----------|----------------|-------------------------------------|
| GET      | `/mascota`     | Obtiene todos los mascotas.         |
| GET      | `/mascota/busqueda`| Filtra mascotas por cliente.          |
| POST     | `/mascota`     | Crea un nuevo mascota.              |
| PUT      | `/mascota/:id` | Actualiza los datos de un mascota.  |
| DELETE   | `/mascota/:id` | Elimina un mascota por su ID.       |


## Despliegue en Vercel 
---
Ya está disponible en VERCEL 👉 


## Creditos
---

Desarrollado por [Esteban Martin]