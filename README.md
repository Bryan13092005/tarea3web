# Auth Fullstack (Registro, Verificación y Recuperación de Contraseña)

Proyecto fullstack con:
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React (Vite)

Incluye flujos para:
1. Registro de usuario
2. Verificación de cuenta (por token)
3. Recuperación de contraseña (por token)
4. Cambio de contraseña

> Nota: el frontend usa un **proxy** del dev server para llamar a la API en `/api`.

---

## Estructura del proyecto

- `backend/`
  - `server.js`: inicializa Express y conecta a MongoDB
  - `routes/auth.routes.js`: define rutas de autenticación
  - `controllers/auth.controller.js`: lógica de registro/verificación/recuperación
  - `models/user.js`: modelo de usuario
- `frontend/`
  - `src/App.jsx`: router de páginas
  - `src/services/authService.js`: cliente HTTP (axios)
  - `src/pages/*`: componentes de Registro, Verificación, Forgot Password, Reset Password

---

## Prerrequisitos

- Node.js (recomendado 18+)
- MongoDB (local o remoto)

---

## Variables de entorno

Crea archivos `.env` en estas carpetas:

### `backend/.env`

```bash
PORT=3000
MONGO_URI=mongodb+srv://usuario:clave@cluster0.mnm8his.mongodb.net/NombreBaseDatos
JWT_SECRET=secreta_pass_NOCAMBIAR
FRONTEND_URL=http://localhost:5173
EMAIL_USER=correo@epn.edu.ec
EMAIL_PASS=clave_NOCAMBIAR
```

- `MONGO_URI`: conexión a MongoDB
- `PORT` (opcional): puerto del backend (default `3000`)

### `frontend/.env`

No es necesario para este proyecto (la configuración se hace en Vite con proxy).

---

## Instalación

### 1) Backend
En la carpeta raiz abrir un terminal y ejecuta:r
```bash
cd /backend
npm install
```

### 2) Frontend
En otro terminal de la carpeta raiz, ejecutar:
```bash
cd /frontend
npm install
```

---

## Ejecución en desarrollo

### Opción A: correr frontend y backend en terminales separadas

**Backend**
En la terminal del backend
```bash
npm run dev
```

**Frontend**
En la terminal del frontend
```bash
npm run dev
```

Luego abre el frontend (por defecto suele ser `http://localhost:5173`).

---

## Endpoints del Backend

Base: `http://localhost:3000/api/auth`

### 1) Registro

- **POST** `/register`

**Body** (JSON):
```json
{
  "name": "Nombre",
  "email": "correo@dominio.com",
  "password": "password123"
}
```

**Respuesta**:
```json
{
  "message": "Usuario registrado correctamente",
  "userId": "...",
  "verificationToken": "..."
}
```

Detalles:
- Password se hashea con `bcryptjs`.
- Se genera un `verificationToken` JWT con expiración **1d**.
- Se guarda `verificationToken` en el usuario.

---

### 2) Verificar cuenta

- **GET** `/verify/:token`

**Params**:
- `token`: JWT generado en el registro

**Respuesta**:
```json
{ "message": "Cuenta verificada correctamente" }
```

---

### 3) Solicitar recuperación de contraseña

- **POST** `/forgot-password`

**Body**:
```json
{ "email": "correo@dominio.com" }
```

**Respuesta**:
```json
{
  "message": "Token de recuperación generado",
  "resetToken": "..."
}
```

Detalles:
- Si el email no existe responde `404`.
- Se genera un `resetToken` JWT con expiración **15m**.
- Se guarda `resetToken` en el usuario.

---

### 4) Resetear contraseña

- **POST** `/reset-password/:token`

**Body**:
```json
{ "newPassword": "nueva_contraseña" }
```

**Validaciones**:
- `newPassword` debe tener al menos **6** caracteres.

**Respuesta**:
```json
{ "message": "Contraseña actualizada correctamente" }
```

---

## Frontend (Rutas y páginas)

El frontend define estas rutas:
- `/` → **Register**
- `/verify/:token` → **VerifyAccount**
- `/forgot-password` → **ForgotPassword**
- `/reset-password/:token` → **ResetPassword**

Flujo típico:
1. Registras un usuario en `/` (el backend devuelve `verificationToken`).
2. Verificas entrando a `/verify/:token` con el token.
3. En `/forgot-password` solicitas recuperación y recibes `resetToken`.
4. En `/reset-password/:token` escribes una nueva contraseña.

---

## Cómo probar rápido (manual)

1. Ejecuta backend y frontend.
2. Abre el frontend.
3. Regístrate:
   - Copia el `verificationToken` que devuelve la API (se muestra en el mensaje del frontend).
4. Pasa a la URL `/verify/<token>`.
5. Ve a `/forgot-password`:
   - Ingresa el email.
   - Copia el `resetToken`.
6. Ve a `/reset-password/<resetToken>`:
   - Ingresa la nueva contraseña.

---

## Consideraciones de seguridad (importante)

- Este proyecto usa JWT para generar tokens de verificación y reset.
- `JWT_SECRET` debe ser **robusto**.
- Los tokens de reset expiran en **15 minutos**.

> En un entorno real, normalmente los tokens se enviarían por email (aunque en el backend existe dependencia `nodemailer`, el flujo actual entrega tokens directamente por respuesta HTTP).

---

## Tecnologías usadas

### Backend
- Express
- Mongoose (MongoDB)
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### Frontend
- React
- React Router
- Vite
- axios

---

## Scripts

- Backend:
  - `npm run dev`: nodemon
  - `npm start`: node

- Frontend:
  - `npm run dev`: vite
  - `npm run build`: vite build
  - `npm run preview`: vite preview

---

## Notas para el desarrollo

- `frontend/vite.config.js` hace proxy de `/api` hacia `http://localhost:3000`.
- El frontend llama a endpoints con base `const API_URL = "/api/auth";`.

---

### Checklist de verificación del proyecto

- [x] Registro
- [x] Verificación de cuenta
- [x] Solicitud de recuperación
- [x] Cambio de contraseña

