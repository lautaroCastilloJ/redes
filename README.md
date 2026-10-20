# Apuntes de Redes de Datos

Landing de apuntes: Teoría (Unidades 1–5), Práctica (TP N°1–10 y Trabajo Final Integrador) y Parcial integral.

## Estructura

- `src/index.html`: la página, en formato artifact de Claude (sin `<html>`, `<head>` ni `<body>`).
- `scripts/build.mjs`: arma `dist/index.html` como documento completo para Vercel.
- `vercel.json`: Vercel corre `npm run build` y publica `dist/`.
- `.githooks/post-commit`: sube cada commit a GitHub, y Vercel lo despliega.

## Despliegue

Cada commit se sube solo a GitHub y Vercel lo despliega: `main` va a producción y las demás ramas a una URL de preview.

El hook se activa una vez por clon:

```bash
git config core.hooksPath .githooks
```

Build local:

```bash
npm run build
```

## Dónde están los apuntes

Lo que se escribe en cada sección se guarda en la base de datos del artifact en claude.ai, no en este repo. La versión de Vercel muestra la estructura en modo solo lectura.
