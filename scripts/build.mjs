// Arma dist/index.html para Vercel a partir de src/index.html.
// src/index.html está en formato artifact de Claude (sin <!doctype>, <html>, <head> ni <body>,
// porque claude.ai los agrega al publicar). Acá se envuelve en un documento completo.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const src = await readFile(new URL('src/index.html', root), 'utf8');

if (/<!doctype|<html[\s>]|<body[\s>]/i.test(src)) {
  throw new Error('src/index.html debe quedar sin <!doctype>, <html> ni <body>: el build los agrega.');
}

// Todo lo que va antes del primer </style> (title, meta, fuentes, estilos) pasa al <head>.
const fin = src.indexOf('</style>');
if (fin === -1) throw new Error('src/index.html: no se encontró el bloque <style> inicial.');
const head = src.slice(0, fin + '</style>'.length).trim();
const body = src.slice(fin + '</style>'.length).trim();

const descripcion = 'Apuntes de Redes de Datos: teoría por unidad, trabajos prácticos y repaso para el parcial integral.';
const icono = 'data:image/svg+xml,' + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>" +
  "<rect width='32' height='32' rx='4' fill='#151412'/>" +
  "<path d='M7 9h18v9h-5v5h-8v-5H7z' fill='#ECE5D6'/></svg>"
);
// Mismo reset base que claude.ai pone alrededor del artifact.
const reset = ':root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
  'body{margin:0;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}[hidden]{display:none!important}';

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${descripcion}">
<link rel="icon" href="${icono}">
<style>${reset}</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;

const dist = new URL('dist/', root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await writeFile(new URL('index.html', dist), html);
console.log(`dist/index.html listo (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
