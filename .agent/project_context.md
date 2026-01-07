# Project Context: SBA Interactive (US)

## Tech Stack
- **Framework**: [Astro 5](https://astro.build/)
- **Component Engine**: [Svelte 5](https://svelte.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Skeleton v4](https://skeleton.dev/) (Skeletonlabs)
- **Icons**: [unplugin-icons](https://github.com/unplugin/unplugin-icons)
- **Animations**: [GSAP](https://gsap.com/) & [Motion](https://motion.dev/)
- **Internationalization**: [astro-i18next](https://github.com/yassinedoghri/astro-i18next) (configured with JSON files in `src/i18n`)
- **Package Manager**: [Bun](https://bun.sh/)

## Project Structure
- `src/components/`: Svelte components
- `src/layouts/`: Astro layouts
- `src/pages/`: Astro pages (routing)
- `src/i18n/`: Translation JSON files (de, en, es, fr, gl, it, pl)
- `src/styles/`: Global CSS and styling
- `public/`: Static assets

## Configuration Files
- `astro.config.mjs`: Astro integrations and Vite config (Tailwind, Icons)
- `tailwind.config.js`: (Likely handled by Tailwind 4's new engine or global.css imports)
- `package.json`: Dependency management
- `tsconfig.json`: TypeScript configuration

## Coding Standards
- Use Svelte 5 for interactive components.
- Use Astro for pages and layouts.
- Prefer Tailwind CSS classes for styling.
- Use Skeleton components for UI elements.
- Icons should be imported using `virtual:icons/...`.

## Current State
- The project is in early development stages.
- The `header.svelte` component is partially implemented using Skeleton.
- i18n files are currently empty placeholders.
