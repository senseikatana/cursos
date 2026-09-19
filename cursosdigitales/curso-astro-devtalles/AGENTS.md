# AGENTS.md — astrocurse-devtalles

## What This Is

Content repository for an Astro course/blog from DevTalles (Spanish programming education platform). Currently contains only content assets — no Astro project structure exists yet.

## Repository Structure

```
.
├── assets/
│   ├── posts/        # Blog posts in Markdown with frontmatter (Spanish)
│   └── images/       # Post images matching post filenames
├── .atl/             # Gentle-ai skill registry (OpenCode tooling)
└── .mimocode/        # Mimo-ai plugin configuration
```

## Content Format

Posts use this frontmatter structure:

```yaml
---
title: Spanish title
date: YYYY-MM-DD
description: Spanish description
author: Author Name
image: '/assets/images/post-XX.png'
tags: [Tag1, Tag2]
---
```

Key conventions:
- Posts are in `assets/posts/post-XX.md`
- Images match post filenames: `assets/images/post-XX.png`
- Optimized images in `assets/images/optimized/` (AVIF format)
- All content is in Spanish

## Current State

- No Astro project structure (no src/, no astro.config, no package.json)
- No git commits yet
- 5 posts ready covering: ES6 JavaScript, Flutter, React Hooks, and more
- AI tooling configured for content creation workflows

## Expected Astro Structure

When building the Astro site, follow standard conventions:

```
src/
├── content/
│   └── posts/        # Source posts from assets/posts/
├── layouts/
├── pages/
└── components/
public/
└── images/           # Source images from assets/images/
astro.config.mjs
package.json
```

Post collection should:
- Read from `assets/posts/` using Astro content collections
- Map image paths to `public/images/` during build
- Support Spanish-first content with proper lang attributes

## AI Tooling

Two AI tool configurations exist:
- `.atl/` — Gentle-ai skill registry for OpenCode agents
- `.mimocode/` — Mimo-ai plugin for content workflows

These are metadata directories — do not modify unless updating AI tooling.

## Content Conventions

- Language: Spanish (all posts, descriptions, titles)
- Audience: Spanish-speaking developers learning programming
- Topics: JavaScript, React, Flutter, and related technologies
- Tone: Educational, accessible, practical examples preferred
