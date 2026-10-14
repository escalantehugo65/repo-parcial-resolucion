# Sistema de Gestión de Proyectos de Software

API REST con Node.js, Express, Sequelize y MySQL.

## Instalación y configuración

1. Instalar Node.js y disponer de un servidor MySQL en ejecución.
2. Abrir una terminal en la carpeta del proyecto y ejecutar `npm install`.
3. Copiar `.env.example` a `.env`.
4. Configurar `PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y `JWT_SECRET`.
5. Crear en MySQL una base de datos vacía con el nombre indicado en `DB_NAME`.
6. Ejecutar `npm run dev`. Para iniciar sin nodemon, ejecutar `npm start`.
7. Importar `Primer-Parcial.postman_collection.json` en Postman y ajustar el puerto de sus peticiones al valor de `PORT`.
8. Registrar un usuario e iniciar sesión. Postman conserva la cookie `token` para las peticiones protegidas.

El registro recibe `username`, `email`, `password`, `role` opcional y un objeto `profile` con `employee_number`, `first_name`, `last_name` y `phone` opcional.

La creación de proyectos recibe `code`, `name`, `description`, `start_date`, `budget`, `leader_id`, `technologies` y `status` opcional. `leader_id` identifica al usuario activo designado como líder. En la edición todos estos campos son opcionales. Si se envía `technologies`, reemplaza las asociaciones anteriores; un array vacío las elimina.

El enunciado menciona un formato específico para `code` y `employee_number`, pero no define ese patrón. Se comprueba que sean textos no vacíos, con la longitud admitida por sus columnas y valores únicos.

## Endpoints

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | /api/auth/register | Público |
| POST | /api/auth/login | Público |
| POST | /api/auth/logout | Sesión iniciada |
| GET | /api/users | Administrator |
| DELETE | /api/users/:id | Administrator |
| POST | /api/technologies | Administrator |
| GET | /api/technologies | Sesión iniciada |
| DELETE | /api/technologies/:id | Administrator |
| POST | /api/projects | Sesión iniciada |
| GET | /api/projects | Administrator |
| GET | /api/projects/my-projects | Sesión iniciada |
| PUT | /api/projects/:id | Líder del proyecto |
| DELETE | /api/projects/:id | Líder del proyecto |

`.env` y `node_modules` no deben subirse al repositorio.
