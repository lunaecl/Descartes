# Descartes y Fermat · Infografía interactiva

Sitio web estático en HTML, CSS y JavaScript sobre la disputa histórica entre René Descartes y Pierre de Fermat en torno al nacimiento de la geometría analítica.

## Estructura del proyecto

```text
descartes-fermat-github/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── README.md
└── .gitignore
```

## Cómo verlo localmente

Puedes abrir `index.html` directamente en tu navegador.

Para probarlo con servidor local:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

## Cómo subirlo a GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos y carpetas de este proyecto, dejando `index.html` en la raíz del repositorio.
3. En GitHub, entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/root`
5. Guarda los cambios.
6. GitHub generará una URL pública para ver el sitio.

## Créditos

Autor del HTML: **Emiliano Criollo Luna**.

Texto, diseño, diagramas y desarrollo front-end de una pieza single-page con HTML, CSS y JavaScript.

## Notas

- El sitio usa fuentes de Google Fonts.
- Algunas imágenes se cargan desde Wikimedia Commons mediante URL externa.
- No requiere compilación, frameworks ni dependencias locales.
