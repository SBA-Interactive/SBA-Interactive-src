<script lang="ts">
  import { i18n } from '../i18n/store.svelte.ts';
  import IconCarbonHome from 'virtual:icons/carbon/home';
  import IconCarbonRocket from 'virtual:icons/carbon/rocket';
  import { onMount } from 'svelte';
  import { animate } from 'motion';

  const base = import.meta.env.BASE_URL;

  let container: HTMLElement;

  onMount(() => {
    if (container) {
      animate(container, 
        { opacity: [0, 1], y: [20, 0] }, 
        { duration: 0.8, easing: "ease-out" }
      );
    }
  });
</script>

<div bind:this={container} class="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden py-20 opacity-0">
    <!-- Background Decor -->
    <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]"></div>
        <div class="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="max-w-3xl w-full text-center">
        <!-- Error Code -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-red-500/20 backdrop-blur-md">
            <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {$i18n.t('error_404.pill')}
        </div>

        <!-- Title -->
        <h1 class="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-8">
            <span class="text-slate-900 dark:text-white">{$i18n.t('error_404.title_1')}</span><br/>
            <span class="inline-block pb-5 pr-4 bg-linear-to-r from-primary-500 via-secondary-500 to-primary-600 bg-clip-text text-transparent italic">{$i18n.t('error_404.title_2')}</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium mb-12">
            {$i18n.t('error_404.subtitle')}
        </p>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
                href={`${base}`}
                class="group flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/10"
            >
                <IconCarbonHome class="w-5 h-5" />
                {$i18n.t('error_404.btn_home')}
            </a>
            
            <a 
                href={`${base}brief/`}
                class="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-surface-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-white/10 rounded-2xl font-black text-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:text-primary-600 dark:hover:text-primary-400"
            >
                <IconCarbonRocket class="w-5 h-5" />
                {$i18n.t('error_404.btn_project')}
            </a>
        </div>
    </div>
</div>
