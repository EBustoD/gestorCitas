<h1>Gestor de citas con recordatorios via WhatsApp</h1>
<h2>Frontend React + TS / Backend Node/MySQL</h2>

<h3><b>Antes de empezar</b></h3>

- requiere base de datos local, credenciales y nombre del esquema pueden cambiarse en db.js
- Statement de creación de tabla de citas:

``` sql
  `idCita` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(70) DEFAULT NULL,
  `Telefono` int NOT NULL,
  `Fecha` datetime NOT NULL,
  `Nota` text,
  PRIMARY KEY (`idCita`),
  UNIQUE KEY `idCita_UNIQUE` (`idCita`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

``` 
<h3>Iniciar Frontend</h3>

- Para iniciar el frontend nos movemos a la carpeta del frontend, corremos <b>npm install</b> y cuando termine <b>npm run dev</b> 

<h3>Iniciar Backend + conexión a WhatsApp</h3>

- Para iniciar el backend nos movemos a la carpeta de backend, corremos <b>npm install</b> y <b>node app.js.</b>
- Al lanzar el backend se generara un codigo QR que se tiene que escanear desde el numero de telefono desde el que queramos lanzar las alertas de las distintas citas.

- El job de las citas se lanza cada mañana a las 8AM y manda un aviso a todas las personas que tengan una cita al dia siguiente del que se lanza el job.
- Para modificar la frecuencia se hace en jobs/reminder.js
