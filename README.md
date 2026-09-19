# Cursos

Cursos y formación en desarrollo web. Cada carpeta es un curso independiente y en este README llevo el índice general y el temario que voy apuntando a medida que avanzo.

## Índice de cursos

| Curso | Plataforma | Stack | Carpeta | Estado |
| --- | --- | --- | --- | --- |
| [Astro: El framework para sitios web orientados al contenido](https://cursos.devtalles.com/courses/astro) | DevTalles · Fernando Herrera | Astro, TypeScript, Astro DB, SSR | [`astro-devtalles/`](astro-devtalles/) | Base inicial (docs + config) |
| [GIT+GitHub: Control de versiones desde Cero](https://cursos.devtalles.com/courses/git-github-control-versiones-desde-cero) | DevTalles · Fernando Herrera | Git, GitHub, GitHub Actions | [`github-devtalles/`](github-devtalles/) | Repo de práctica (Legión del Mal) |
| [Nuxt: El marco de trabajo web progresivo (Nuxt 4+)](https://cursos.devtalles.com/courses/nuxt) | DevTalles · Fernando Herrera | Nuxt 4, Vue 3, NuxtUI, Prisma, PostgreSQL | [`nuxt-devtalles/`](nuxt-devtalles/) | Starter configurado |
| [Headless WordPress - Astro WP REST API Tailwind TypeScript](https://www.udemy.com/course/headless-wordpress-astro-wp-rest-api-tailwind-typescript-react-vue/) | Udemy · Juan Pablo de la Torre | Astro, WordPress, WP REST API, React, Vue | [`headlesswp-astro-udemy/`](headlesswp-astro-udemy/) | App en desarrollo (CoffeeShop) |

## Cómo apunto el temario

- **Sección terminada:** `- [x] Sección N: Nombre`.
- **Clases:** se anidan debajo de su sección a medida que las voy viendo.

```md
- [x] Sección 1: Introducción
  - [x] Introducción
  - [ ] Instalaciones necesarias
- [ ] Sección 2: Introducción a Astro
```

---

## Astro: El framework para sitios web orientados al contenido

- **Plataforma:** DevTalles — Fernando Herrera
- **Carpeta:** [`astro-devtalles/`](astro-devtalles/)
- **Stack del curso:** Astro, TypeScript, Astro DB, SSR/SSG, Turso, despliegues a Cloudflare/Netlify
- **Estado del material:** documentación y configuración base (`README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `.env.example`, `package.json`). El proyecto del curso todavía no está construido en la carpeta.

### Temario

- [ ] Sección 1: Introducción
- [ ] Sección 2: Introducción a Astro
- [ ] Sección 3: Rutas dinámicas y paginación estática
- [ ] Sección 4: Añadir dinamismo a nuestro sitio estático
- [ ] Sección 5: Colecciones e imágenes
- [ ] Sección 6: Relaciones de colecciones
- [ ] Sección 7: Astro Themes
- [ ] Sección 8: RSS Feed
- [ ] Sección 9: Server Side Rendering y Endpoints
- [ ] Sección 10: Astro DB
- [ ] Sección 11: Server Actions - Funciones de Blog - Likes Counter
- [ ] Sección 12: Autenticación y protección de rutas
- [ ] Sección 13: Autenticación y autorización - Auth.js

---

## GIT+GitHub: Control de versiones desde Cero

- **Plataforma:** DevTalles — Fernando Herrera
- **Carpeta:** [`github-devtalles/`](github-devtalles/)
- **Stack del curso:** Git, GitHub, GitHub Actions, Markdown
- **Estado del material:** repositorio temático "La Legión del Mal" (`headquarters/`, `members/`, `missions/`, `plans/`, `intelligent/`), con el zip del proyecto de la sección 8 y `.env` de ejemplo con códigos de lanzamiento.

### Temario

<!-- Acá voy apuntando las secciones y clases del curso -->

---

## Nuxt: El marco de trabajo web progresivo (Nuxt 4+)

- **Plataforma:** DevTalles — Fernando Herrera
- **Carpeta:** [`nuxt-devtalles/`](nuxt-devtalles/)
- **Stack del curso:** Nuxt 4, Vue 3, TypeScript, NuxtUI, Prisma, PostgreSQL/Neon, Cloudinary
- **Estado del material:** starter de Nuxt con los módulos del curso configurados (`@nuxt/content`, `@nuxt/ui`, `@nuxt/image`, `@nuxtjs/i18n`, `@nuxthub/core`, entre otros). `app.vue` sigue siendo el welcome por defecto.

### Temario

<!-- Acá voy apuntando las secciones y clases del curso -->

---

## Headless WordPress - Astro WP REST API Tailwind TypeScript

- **Plataforma:** Udemy — Juan Pablo de la Torre
- **Carpeta:** [`headlesswp-astro-udemy/`](headlesswp-astro-udemy/)
- **Stack del curso:** Astro, WordPress, WP REST API, Tailwind, TypeScript, React y Vue
- **Estado del material:** app CoffeeShop propia (React 19, Vite, Hono, Prisma, Better Auth sobre Neon), con workflow de previews de Neon en GitHub Actions. El curso construye sus proyectos (CoffeeShop y FreshCoffee) con Astro + WordPress.

### Temario

<!-- Acá voy apuntando las secciones y clases del curso -->

---

## Estructura del repositorio

```
cursos/
├── astro-devtalles/
├── github-devtalles/
├── headlesswp-astro-udemy/
├── nuxt-devtalles/
├── README.md
└── package.json
```

Cada curso es autónomo: sus dependencias, scripts y documentación viven dentro de su carpeta.

## Licencia

Ver el archivo `LICENSE` de cada curso. El índice raíz se distribuye bajo MIT (ver [`LICENSE`](LICENSE)).
