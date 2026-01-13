// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from "@tailwindcss/vite";
import Icons from 'unplugin-icons/vite';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
    site: 'https://sba-interactive.github.io',
    base: isProd ? '/sba-interactive' : undefined,
    trailingSlash: 'always',
    output: 'static',
    integrations: [svelte()],
    vite: {
        plugins: [tailwindcss(), Icons({ compiler: 'svelte', autoInstall: true })]
    }
});
