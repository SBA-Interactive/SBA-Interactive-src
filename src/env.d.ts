/// <reference types="astro/client" />

declare module 'virtual:icons/*' {
    import type { ComponentType, SvelteComponent } from 'svelte';
    const component: ComponentType<SvelteComponent>;
    export default component;
}
