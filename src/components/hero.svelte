<script lang="ts">
	import { onMount } from 'svelte';
	import IconCarbonSettings from 'virtual:icons/carbon/settings';
	import IconCarbonCode from 'virtual:icons/carbon/code';
	import IconCarbonDevelopment from 'virtual:icons/carbon/development';
	import heroBg from '../assets/images/hero.png';
	import { i18n } from '../i18n/store.svelte.ts';

	let scrollY = $state(0);
	
	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section class="relative min-h-screen flex items-center overflow-hidden py-24 lg:py-32 transition-colors duration-500">

	<div class="absolute inset-0 -z-10 bg-white dark:bg-surface-950 overflow-hidden">

        <div 
            class="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 backdrop-blur-xl dark:opacity-60 blur-[10px] -sepia-150 grayscale pointer-events-none z-0" 
            style="background-image: url({typeof heroBg === 'string' ? heroBg : heroBg.src});"
        ></div>

		<div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#0ea5e915,transparent_50%)]"></div>
		<div class="bg-blob absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]"></div>
		<div class="bg-blob absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary-500/10 rounded-full blur-[150px]"></div>
	</div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="grid lg:grid-cols-12 gap-16 items-center">

			<div class="lg:col-span-7 flex flex-col gap-8 md:gap-10">
				<div>
					<div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-slate-200 dark:border-white/10 backdrop-blur-md">
						<span class="relative flex h-2 w-2">
							<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						{$i18n.t('hero.pill')}
					</div>
					<h1 class="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-slate-900 dark:text-white">
						{$i18n.t('hero.title_1')} <br/>
						<span class="bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent italic">{$i18n.t('hero.title_2')}</span>
					</h1>
				</div>
				
				<p class="text-xl md:text-2xl text-slate-600 dark:text-slate-200 max-w-2xl leading-relaxed font-normal text-balance">
					{@html $i18n.t('hero.subtitle')}
				</p>

				<div class="flex flex-wrap gap-6 items-center pt-4">
					<a 
						href="#pricing" 
						class="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg rounded-full shadow-2xl transition-all flex items-center gap-3 group"
					>
						{$i18n.t('hero.btn_explore')}
						<span class="group-hover:translate-x-1 transition-transform">→</span>
					</a>
					<a 
						href="#contact" 
						class="px-8 py-4 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-semibold text-lg rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
					>
						{$i18n.t('hero.btn_start')}
					</a>
				</div>
			</div>


			<div class="lg:col-span-5 grid gap-5">
				<div class="glass-card p-6 rounded-[32px] flex items-center gap-5 transition-all duration-300 cursor-default border border-white/40 dark:border-white/5">
					<div class="w-14 h-14 rounded-[20px] bg-blue-50 dark:bg-blue-900/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
						<IconCarbonSettings class="w-7 h-7" />
					</div>
					<div>
						<h3 class="text-lg font-bold mb-1 text-slate-900 dark:text-white tracking-tight">{$i18n.t('hero.card_wp_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{$i18n.t('hero.card_wp_desc')}</p>
					</div>
				</div>

				<div class="glass-card p-6 rounded-[32px] flex items-center gap-5 transition-all duration-300 cursor-default border border-white/40 dark:border-white/5">
					<div class="w-14 h-14 rounded-[20px] bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
						<IconCarbonCode class="w-7 h-7" />
					</div>
					<div>
						<h3 class="text-lg font-bold mb-1 text-slate-900 dark:text-white tracking-tight">{$i18n.t('hero.card_custom_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{$i18n.t('hero.card_custom_desc')}</p>
					</div>
				</div>

				<div class="glass-card p-6 rounded-[32px] flex items-center gap-5 transition-all duration-300 cursor-default border border-white/40 dark:border-white/5">
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


	<button 
		class="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[100] transition-all duration-700 cursor-pointer group {scrollY > 50 ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'}" 
		onclick={() => {
			const target = document.getElementById('why-us');
			if (target) {
				const headerHeight = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
		}}
		aria-label="Scroll to content"
	>
		<div class="relative">
			<div class="absolute inset-0 bg-primary-500/20 blur-xl rounded-full scale-150 animate-pulse-slow group-hover:opacity-0 transition-opacity duration-500"></div>
			<div class="w-7 h-12 border-2 border-primary-500 dark:border-primary-400 rounded-full relative bg-white/5 dark:bg-white/[0.02] backdrop-blur-md group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors flex justify-center">
				<div class="w-1.5 h-3 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full absolute top-2 animate-scroll-pill group-hover:from-slate-400 group-hover:to-slate-600 transition-all duration-500"></div>
			</div>
		</div>
		<span class="text-[11px] uppercase font-black tracking-[0.4em] text-primary-500 group-hover:text-slate-400 dark:group-hover:text-slate-500 transition-colors drop-shadow-sm">{$i18n.t('hero.scroll')}</span>
	</button>

	<style>
		@keyframes scroll-pill {
			0% { transform: translateY(0); opacity: 0; scaleY: 1; }
			20% { opacity: 1; scaleY: 1.2; }
			80% { opacity: 1; scaleY: 0.8; }
			100% { transform: translateY(24px); opacity: 0; scaleY: 0.5; }
		}
		@keyframes pulse-slow {
			0%, 100% { transform: scale(1.5); opacity: 0.1; }
			50% { transform: scale(2); opacity: 0.3; }
		}
		.animate-scroll-pill {
			animation: scroll-pill 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
		}
		.animate-pulse-slow {
			animation: pulse-slow 3s ease-in-out infinite;
		}
	</style>
</section>
