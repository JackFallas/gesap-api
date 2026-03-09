# gesap-api

API principal del sistema GESAP (Sistema de Gestión de Atención a Pacientes).

## Requisitos

- Node.js 18+
- PostgreSQL 15+

## Instalación

```bash
npm install
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

## Ejecución

```bash
npm run start:dev
```

El servidor corre en `http://localhost:3000/gesap/v1`

## Credenciales por defecto

- Email: `auditor@gesap.gt`
- Password: `GESAP2024!`

## Endpoints principales

- `POST /gesap/v1/auth/login` — Login
- `GET /gesap/v1/auth/profile` — Perfil del usuario autenticado
- `/gesap/v1/roles` — CRUD de roles
- `/gesap/v1/users` — CRUD de usuarios
- `/gesap/v1/patients` — CRUD de pacientes
- `GET /gesap/v1/patients/dpi/:dpi` — Búsqueda por DPI (emergencia)
- `/gesap/v1/patients/allergies` — Gestión de alergias
- `/gesap/v1/patients/medical-records` — Expedientes médicos
- `/gesap/v1/patients/treatments` — Tratamientos
