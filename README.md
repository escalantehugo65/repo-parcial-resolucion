# Primer Parcial – Sistema de Gestión de Proyectos de Software (Base)

API REST con Node.js, Express y Sequelize/MySQL.

## Instalación

1. `npm install`
2. Copiar `.env.example` a `.env` y completar los valores.
3. Crear la base de datos en MySQL (`DB_NAME`).
4. `npm run dev`

## Endpoints

- POST `/api/auth/register`: público.
- POST `/api/auth/login`: público.
- POST `/api/auth/logout`: sesión iniciada.
- GET `/api/users`: administrator.
- DELETE `/api/users/:id`: administrator.
- POST `/api/technologies`: administrator.
- GET `/api/technologies`: sesión iniciada.
- DELETE `/api/technologies/:id`: administrator.
- POST `/api/projects`: sesión iniciada.
- GET `/api/projects`: administrator.
- GET `/api/projects/my-projects`: sesión iniciada.
- PUT `/api/projects/:id`: líder del proyecto.
- DELETE `/api/projects/:id`: líder del proyecto.
