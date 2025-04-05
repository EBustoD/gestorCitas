<<<<<<< HEAD
# Gestor de Citas

A modern appointment management system built with Next.js and React. This application allows users to manage appointments through an intuitive calendar interface.

![Login Screen](https://placeholder.svg?height=300&width=700&text=Login+Screen+Screenshot)

## Features

- 🔐 **Secure Authentication**: Login system with protected routes
- 📅 **Interactive Calendar**: View, create, and manage appointments
- 👥 **Client Management**: Keep track of client information and appointment history
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔔 **Notifications**: Real-time feedback for user actions
- 🌙 **Theme Support**: Light and dark mode available

## Screenshots

### Dashboard
![Dashboard](https://placeholder.svg?height=300&width=700&text=Dashboard+Screenshot)

### Calendar View
![Calendar](https://placeholder.svg?height=300&width=700&text=Calendar+Screenshot)

### Client Management
![Clients](https://placeholder.svg?height=300&width=700&text=Clients+Screenshot)

### Appointment Creation
![Create Appointment](https://placeholder.svg?height=300&width=700&text=Create+Appointment+Screenshot)

## Technologies Used

- **Frontend**:
  - Next.js 14
  - React 19
  - Tailwind CSS
  - Shadcn UI Components
  - React Big Calendar
  - Moment.js

- **Backend**:
  - Node.js
  - Express
  - MySQL/PostgreSQL (your database choice)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Backend API running (see Backend Setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gestor-citas.git
   cd gestor-citas
=======
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
>>>>>>> 20ef60651de6a3f4197683cc8565ea27f72308c9
