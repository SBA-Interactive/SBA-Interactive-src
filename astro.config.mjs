// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://sba-interactive.github.io',
    // base: '/sba-interactive',
    output: 'static',
    integrations: [svelte(), sitemap()],
    vite: {
        plugins: [
            tailwindcss(),
            Icons({ compiler: 'svelte', autoInstall: true })
        ]
    }
});
