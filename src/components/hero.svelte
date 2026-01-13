<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonSettings from 'virtual:icons/carbon/settings';
	import IconCarbonCode from 'virtual:icons/carbon/code';
	import IconCarbonDevelopment from 'virtual:icons/carbon/development';
	import heroBg from '../assets/images/hero.png';
	import { i18n } from '../i18n/store';

	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let heroButtons: HTMLElement;
	let heroCards: HTMLElement;
	let scrollIndicator: HTMLElement;
	let section: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

    // Fast & Snappy Entrance
    // 1. Initial set
    gsap.set([heroTitle, heroSubtitle, heroButtons.children, heroCards.children], { opacity: 0, y: 30 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to(heroTitle, { 
        y: 0, 
        opacity: 1, 
        duration: 1.0
    })
    .to(heroSubtitle, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5
    }, "-=0.4")
    .to(heroButtons.children, { 
        y: 0, 
        opacity: 1,
        stagger: 0.05, 
        duration: 0.1
    }, "-=0.3")
    .to(heroCards.children, { 
        x: 0,
        y: 0,
        opacity: 1, 
        stagger: 0.08, 
        duration: 0.33,
        clearProps: "transform,opacity"
    }, "-=0.4");

		gsap.to(".bg-blob", {
			y: 50,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut"
		});

	});
</script>

<section bind:this={section} class="relative min-h-[90vh] flex items-center overflow-hidden py-24 lg:py-32 transition-colors duration-500">
	<!-- Fixed Background Decoration -->
	<div class="absolute inset-0 -z-10 bg-white dark:bg-surface-950 overflow-hidden">
        <!-- Hero Background Image (Styled) -->
        <div 
            class="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 backdrop-blur-xl dark:opacity-60 blur-[10px] -sepia-150 grayscale pointer-events-none z-0" 
            style="background-image: url({typeof heroBg === 'string' ? heroBg : heroBg.src});"
        ></div>

		<div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#0ea5e915,transparent_50%)]"></div>
		<div class="bg-blob absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]"></div>
		<div class="bg-blob absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary-500/10 rounded-full blur-[150px]" style="animation-delay: 2s;"></div>
	</div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="grid lg:grid-cols-12 gap-16 items-center">
			<!-- Text Content -->
			<div class="lg:col-span-7 flex flex-col gap-8 md:gap-10">
				<div bind:this={heroTitle}>
					<div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-slate-200 dark:border-white/10 backdrop-blur-md">
						<span class="relative flex h-2 w-2">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						{$i18n.t('hero.pill')}
					</div>
					<h1 class="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-slate-900 dark:text-white">
						{$i18n.t('hero.title_1')} <br/>
						<span class="bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent italic">{$i18n.t('hero.title_2')}</span>
					</h1>
				</div>
				
				<p bind:this={heroSubtitle} class="text-xl md:text-2xl text-slate-600 dark:text-slate-200 max-w-2xl leading-relaxed font-normal text-balance">
					{@html $i18n.t('hero.subtitle')}
				</p>

				<div bind:this={heroButtons} class="flex flex-wrap gap-6 items-center pt-4">
					<a 
						href="#pricing" 
						class="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg rounded-full shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 group"
					>
						{$i18n.t('hero.btn_explore')}
						<span class="group-hover:translate-x-1 transition-transform">→</span>
					</a>
					<a 
						href="#contact" 
						class="px-8 py-4 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-semibold text-lg rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm"
					>
						{$i18n.t('hero.btn_start')}
					</a>
				</div>
			</div>

			<!-- Visual Content: Service Cards -->
			<div class="lg:col-span-5 grid gap-5" bind:this={heroCards}>
				<div class="glass-card p-6 rounded-[32px] flex items-center gap-5 hover:-translate-y-1 transition-all duration-300 cursor-default border border-white/40 dark:border-white/5">
					<div class="w-14 h-14 rounded-[20px] bg-blue-50 dark:bg-blue-900/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
						<IconCarbonSettings class="w-7 h-7" />
					</div>
					<div>
						<h3 class="text-lg font-bold mb-1 text-slate-900 dark:text-white tracking-tight">{$i18n.t('hero.card_wp_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{$i18n.t('hero.card_wp_desc')}</p>
					</div>
				</div>

				<div class="glass-card p-6 rounded-[32px] flex items-center gap-5 translate-x-6 hover:translate-x-8 transition-all duration-300 cursor-default border border-white/40 dark:border-white/5">
					<div class="w-14 h-14 rounded-[20px] bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
						<IconCarbonCode class="w-7 h-7" />
					</div>
					<div>
						<h3 class="text-lg font-bold mb-1 text-slate-900 dark:text-white tracking-tight">{$i18n.t('hero.card_custom_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{$i18n.t('hero.card_custom_desc')}</p>
					</div>
				</div>

				<div class="glass-card p-6 rounded-[32px] flex items-center gap-5 hover:-translate-y-1 transition-all duration-300 cursor-default border border-white/40 dark:border-white/5">
					<div class="w-14 h-14 rounded-[20px] bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
						<IconCarbonDevelopment class="w-7 h-7" />
					</div>
					<div>
						<h3 class="text-lg font-bold mb-1 text-slate-900 dark:text-white tracking-tight">{$i18n.t('hero.card_saas_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{$i18n.t('hero.card_saas_desc')}</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Professional Scroll Indicator -->
	<button 
		bind:this={scrollIndicator}
		class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-1 transition-opacity duration-300 cursor-pointer group" 
		onclick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
		aria-label="Scroll to content"
	>
		<span class="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 group-hover:text-primary-500 transition-colors">{$i18n.t('hero.scroll')}</span>
		<div class="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full relative group-hover:border-primary-500/50 transition-colors">
			<div class="w-1 h-2 bg-primary-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
		</div>
	</button>
</section>
