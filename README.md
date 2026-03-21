# Tejera Balompie - Liga de Verano Villacanas 2026

App web para gestionar estadisticas, clasificacion y jugadores del equipo.

---

## Stack tecnologico (todo gratis)

| Capa | Tecnologia | Plan gratuito |
|---|---|---|
| Frontend | React + Vite | - |
| Base de datos | Supabase (PostgreSQL) | 500 MB, hasta 50.000 filas |
| Autenticacion | Supabase Auth | Usuarios ilimitados |
| Despliegue | Vercel | Ilimitado para proyectos personales |

---

## Guia de despliegue paso a paso

### Paso 1 - Crear cuenta en Supabase

1. Ve a https://supabase.com y create una cuenta gratis
2. Crea un nuevo proyecto (ponle nombre "tejera-balompie")
3. Elige la region West EU (Ireland) - la mas cercana a Espana
4. Anota la contrasena de la base de datos (guardala bien)
5. Espera 2 minutos a que se cree el proyecto

### Paso 2 - Crear las tablas

1. En el panel de Supabase, ve a SQL Editor (icono de terminal en el menu izquierdo)
2. Copia todo el contenido del archivo supabase_schema.sql
3. Pegalo en el editor y pulsa Run
4. Veras que se crean las tablas jugadores, partidos y estadisticas

### Paso 3 - Obtener las claves de API

1. En Supabase, ve a Project Settings -> API
2. Copia:
   - Project URL -> la necesitaras como VITE_SUPABASE_URL
   - anon public key -> la necesitaras como VITE_SUPABASE_ANON_KEY

### Paso 4 - Configurar el proyecto localmente

  # Entra en la carpeta del proyecto
  cd tejera-app

  # Crea el archivo de variables de entorno
  cp .env.example .env

  # Edita .env y pega tus claves de Supabase:
  # VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
  # VITE_SUPABASE_ANON_KEY=eyJhbGci...

  # Instala dependencias
  npm install

  # Arranca en local para probar
  npm run dev

Abre http://localhost:5173 y veras la app funcionando.

### Paso 5 - Subir a GitHub

  git init
  git add .
  git commit -m "Tejera Balompie v1"
  git branch -M main
  git remote add origin https://github.com/TU_USUARIO/tejera-balompie.git
  git push -u origin main

### Paso 6 - Desplegar en Vercel (gratis)

1. Ve a https://vercel.com y registrate con tu cuenta de GitHub
2. Pulsa New Project -> importa el repositorio tejera-balompie
3. En Environment Variables, anade:
   - VITE_SUPABASE_URL = tu URL de Supabase
   - VITE_SUPABASE_ANON_KEY = tu clave anon
4. Pulsa Deploy
5. En 1 minuto tendras tu app en una URL tipo tejera-balompie.vercel.app

---

## Gestion de usuarios (jugadores)

### Anadir un jugador al sistema

1. Ve a Supabase -> Authentication -> Users -> Invite user
2. Introduce el email del jugador
3. El jugador recibira un email para establecer su contrasena
4. Una vez dentro, podra anadir estadisticas desde el boton + Stats en la navbar

### Hacer a alguien admin

1. Ve a Supabase -> Authentication -> Users
2. Haz clic en el usuario -> Edit
3. En User Metadata, anade: { "es_admin": true }
4. El admin podra gestionar jugadores y partidos

---

## Conectar la app a Supabase (pasar de datos mock a datos reales)

Cuando quieras activar la base de datos real, en cada pagina sustituye la importacion
de mockData por llamadas a Supabase. Ejemplo para Jugadores.jsx:

  // Antes (mock):
  import { jugadores } from '../lib/mockData'

  // Despues (Supabase):
  import { useEffect, useState } from 'react'
  import { supabase } from '../lib/supabase'

  const [jugadores, setJugadores] = useState([])
  useEffect(() => {
    supabase.from('stats_jugadores').select('*').then(({ data }) => setJugadores(data))
  }, [])

---

## Estructura del proyecto

  tejera-app/
  +-- index.html
  +-- vite.config.js
  +-- package.json
  +-- .env.example            <- copia a .env y pon tus claves
  +-- supabase_schema.sql     <- ejecuta esto en Supabase SQL Editor
  +-- src/
      +-- main.jsx
      +-- App.jsx             <- rutas principales
      +-- index.css           <- estilos globales
      +-- lib/
      |   +-- supabase.js     <- cliente de Supabase
      |   +-- mockData.js     <- datos de ejemplo
      +-- hooks/
      |   +-- useAuth.jsx     <- contexto de autenticacion
      +-- components/
      |   +-- Navbar.jsx
      +-- pages/
          +-- Inicio.jsx
          +-- Clasificacion.jsx
          +-- Jugadores.jsx
          +-- Partidos.jsx
          +-- Estadisticas.jsx
          +-- Login.jsx
          +-- AnadirStats.jsx

---

## Proximas mejoras sugeridas

- Panel de admin para anadir/editar jugadores y partidos desde la web
- Fotos de perfil de jugadores (Supabase Storage)
- Notificaciones de partido por WhatsApp o email
- Historial de ediciones (quien anadio que stats)
- PWA para instalar como app en el movil
- Galeria de fotos de los partidos
