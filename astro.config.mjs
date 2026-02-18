// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import Icons from 'unplugin-icons/vite';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.sbaint.eu',
    output: 'static',
    integrations: [
        svelte(), 
        sitemap(),
        partytown({
            config: {
                forward: ["dataLayer.push", "gtag"],
                resolveUrl: (url) => {
                    if (url.hostname === "www.googletagmanager.com") {
                        const proxyUrl = new URL("https://cdn.builder.io/api/v1/proxy-api");
                        proxyUrl.searchParams.append("url", url.href);
                        return proxyUrl;
                    }
                    return url;
                }
            }
        })
    ],
    vite: {
        plugins: [
            tailwindcss(),
            Icons({ compiler: 'svelte', autoInstall: true }),
        ]
    }
});








