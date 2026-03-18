# OpenIA-Maps

> Realiza consultas inteligentes con la API de OpenAI y visualízalas en Google Maps.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai&logoColor=white)](https://openai.com/)

---

## Tabla de contenidos

- [Requisitos previos](#requisitos-previos)
- [Paso 1 — Inicializar el proyecto](#paso-1--inicializar-el-proyecto)
  - [1.1 Crear el package.json](#11-crear-el-packagejson)
  - [1.2 Instalar dependencias de producción](#12-instalar-dependencias-de-producción)
  - [1.3 Instalar dependencias de desarrollo](#13-instalar-dependencias-de-desarrollo)
  - [1.4 Configurar TypeScript](#14-configurar-typescript)
  - [1.5 Añadir scripts de ejecución](#15-añadir-scripts-de-ejecución)

---

## Requisitos previos

| Herramienta | Versión mínima | Enlace |
|-------------|---------------|--------|
| Node.js     | 18+           | [nodejs.org](https://nodejs.org/) |
| npm         | 9+            | Incluido con Node.js |
| Git         | 2.x           | [git-scm.com](https://git-scm.com/) |

Verifica tu instalación:

```bash
node -v
npm -v
git --version
```

---

## Paso 1 — Inicializar el proyecto

### Conceptos clave

**`package.json`** es el manifiesto de tu proyecto Node.js. Define:

- **Nombre, versión y scripts** de ejecución del proyecto.
- **`dependencies`** — paquetes necesarios en producción.
- **`devDependencies`** — paquetes solo para desarrollo (TypeScript, tipos, etc.).

---

### 1.1 Crear el `package.json`

Abre una terminal en la raíz del proyecto y ejecuta:

```bash
npm init -y
```

Esto genera un `package.json` con valores por defecto que iremos completando.

---

### 1.2 Instalar dependencias de producción

```bash
npm install express openai dotenv cors
```

| Paquete   | Descripción |
|-----------|-------------|
| `express` | Framework web para crear el servidor HTTP y definir rutas |
| `openai`  | SDK oficial para llamar a la API de OpenAI |
| `dotenv`  | Carga variables de entorno desde un archivo `.env` |
| `cors`    | Permite que el frontend (otro origen) haga peticiones al backend |

---

### 1.3 Instalar dependencias de desarrollo

```bash
npm install -D typescript ts-node @types/node @types/express @types/cors
```

| Paquete           | Descripción |
|-------------------|-------------|
| `typescript`      | Compilador de TypeScript |
| `ts-node`         | Ejecuta archivos `.ts` directamente sin compilar a mano |
| `@types/node`     | Tipos de TypeScript para las APIs de Node.js |
| `@types/express`  | Tipos para Express |
| `@types/cors`     | Tipos para cors |

---

### 1.4 Configurar TypeScript

Genera el archivo de configuración:

```bash
npx tsc --init
```

Reemplaza el contenido de **`tsconfig.json`** con la siguiente configuración:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./backend",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["backend/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

<details>
<summary><strong>Explicación de cada opción</strong></summary>

| Opción | Valor | Por qué |
|--------|-------|---------|
| `target` | `ES2020` | Compila a ES2020, que soporta `async/await` nativo, optional chaining (`?.`), nullish coalescing (`??`), etc. |
| `module` | `commonjs` | Node.js usa `require()` por defecto. CommonJS es el sistema de módulos estándar de Node. |
| `rootDir` | `./backend` | Define dónde está el código fuente `.ts`. |
| `outDir` | `./dist` | Define dónde se genera el código compilado `.js`. Separa fuente de compilado. |
| `strict` | `true` | Activa **todas** las comprobaciones estrictas. Es lo que hace que TypeScript valga la pena. |
| `esModuleInterop` | `true` | Permite usar `import express from "express"` en vez de `import * as express`. |
| `resolveJsonModule` | `true` | Permite importar archivos `.json` directamente. |
| `skipLibCheck` | `true` | Omite la verificación de tipos en archivos `.d.ts` de terceros. Acelera la compilación. |
| `forceConsistentCasingInFileNames` | `true` | Evita errores por diferencias de mayúsculas/minúsculas en nombres de archivo. |

</details>

---

### 1.5 Añadir scripts de ejecución

Abre `package.json` y asegúrate de que la sección `scripts` contenga:

```json
"scripts": {
  "dev": "ts-node backend/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

| Comando | Qué hace | Cuándo usarlo |
|---------|----------|---------------|
| `npm run dev` | Ejecuta TypeScript directamente con `ts-node` | Durante el desarrollo |
| `npm run build` | Compila todo el proyecto de `.ts` a `.js` | Antes de desplegar |
| `npm start` | Ejecuta el JavaScript compilado | En producción |

---

### Estructura del proyecto hasta ahora

```
aa_4.2/
├── backend/           ← Código fuente TypeScript (se creará en pasos siguientes)
├── dist/              ← Código compilado JavaScript (generado por npm run build)
├── node_modules/      ← Dependencias instaladas
├── .env               ← Variables de entorno (API keys) — NO subir a Git
├── package.json       ← Manifiesto del proyecto
├── package-lock.json  ← Versiones exactas de dependencias
└── tsconfig.json      ← Configuración de TypeScript
```

> **Nota:** La carpeta `backend/` y el archivo `.env` se crearán en los siguientes pasos.

---

<div align="center">

**[Siguiente: Paso 2 →](#)**

</div>
