# astrocurse-devtalles

Repositorio de contenido para el curso/blog de Astro de DevTalles — plataforma educativa de programación en español.

## Descripción

Este repositorio contiene los assets de contenido para un sitio web construido con Astro. Actualmente incluye posts de blog y sus imágenes asociadas, listos para ser integrados en un proyecto Astro.

## Estructura del Repositorio

```
.
├── assets/
│   ├── posts/        # Posts de blog en Markdown con frontmatter (español)
│   └── images/       # Imágenes de posts coincidiendo con nombres de archivo
├── .atl/             # Registro de skills de gentle-ai (herramientas OpenCode)
└── .mimocode/        # Configuración del plugin Mimo-ai
```

## Contenido Actual

El repositorio incluye 5 posts sobre temas de programación:

- **post-01**: Explorando Funciones de ES6 (JavaScript)
- **post-02**: Empezando con Flutter (Mobile Development)
- **post-03**: Comprendiendo los Hooks de React
- **post-04**: [Tema pendiente]
- **post-05**: [Tema pendiente]

## Formato de los Posts

Cada post sigue esta estructura de frontmatter:

```yaml
---
title: Título en español
date: YYYY-MM-DD
description: Descripción en español
author: Nombre del Autor
image: '/assets/images/post-XX.png'
tags: [Tag1, Tag2]
---
```

## Estado Actual

- **Contenido**: 5 posts listos con imágenes asociadas
- **Estructura Astro**: No implementada aún (sin src/, astro.config, package.json)
- **Commits**: Repositorio sin commits previos
- **Herramientas AI**: Configuración de gentle-ai y mimo-ai presente

## Próximos Pasos

Cuando se construya el sitio Astro:

1. Crear estructura de proyecto Astro estándar
2. Configurar colecciones de contenido para posts
3. Mapear imágenes a `public/images/`
4. Implementar layouts y componentes
5. Configurar soporte para contenido en español

## Licencia

Este proyecto está licenciado bajo la GNU Affero General Public License v3.0 — ver el archivo [LICENSE](LICENSE) para detalles.

## Contribuciones

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para pautas sobre cómo contribuir.

## Diseño

Ver [DESIGN.md](DESIGN.md) para decisiones de arquitectura y diseño.
