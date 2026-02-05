<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView, stagger } from 'motion';
	import IconCarbonCloudDownload from 'virtual:icons/carbon/cloud-download';
	import IconCarbonRocket from 'virtual:icons/carbon/rocket';
	import IconCarbonUserFavorite from 'virtual:icons/carbon/user-favorite';
	import IconCarbonSecurity from 'virtual:icons/carbon/security';
	import { i18n } from '../i18n/store.svelte.ts';

	let section: HTMLElement;
	let cards: HTMLElement[] = $state([]);
	let textContent: HTMLElement;
	let techStack: HTMLElement;

	const features = $derived([
		{
			title: i18n.t('features.card_speed_title'),
			description: i18n.t('features.card_speed_desc'),
			icon: IconCarbonRocket,
			color: 'text-orange-500'
		},
		{
			title: i18n.t('features.card_seo_title'),
			description: i18n.t('features.card_seo_desc'),
			icon: IconCarbonCloudDownload,
			color: 'text-blue-500'
		},
		{
			title: i18n.t('features.card_support_title'),
			description: i18n.t('features.card_support_desc'),
			icon: IconCarbonUserFavorite,
			color: 'text-purple-500'
		},
		{
			title: i18n.t('features.card_security_title'),
			description: i18n.t('features.card_security_desc'),
			icon: IconCarbonSecurity,
			color: 'text-emerald-500'
		}
	]);

	onMount(() => {
		// Animate text content
		if (textContent) {
			inView(textContent, () => {
				animate(textContent, 
					{ y: [30, 0], opacity: [0, 1] }, 
					{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }
				);
			}, { margin: "-10% 0px -10% 0px" });
		}

		// Animate cards with stagger
		if (section) {
			inView(section, () => {
				animate(cards, 
					{ y: [30, 0], opacity: [0, 1] }, 
					{ delay: stagger(0.1), duration: 0.6, ease: "ease-out" }
				);
			}, { margin: "-10% 0px -10% 0px" });
		}

		// Animate tech stack
		if (techStack) {
			inView(techStack, () => {
				animate(techStack, 
					{ y: [30, 0], opacity: [0, 1] }, 
					{ duration: 0.8, delay: 0.4, ease: "ease-out" }
				);
			}, { margin: "-10% 0px -10% 0px" });
		}
	});
</script>

<section id="why-us" bind:this={section} class="section-padding bg-surface-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500">

	<div class="feature-grid-bg absolute inset-0 opacity-20 pointer-events-none dark:hidden" style="background-image: radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
	<div class="feature-grid-bg absolute inset-0 opacity-20 pointer-events-none hidden dark:block" style="background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="grid lg:grid-cols-2 gap-24 items-center">
			<div bind:this={textContent}>
				<div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-500/10 dark:bg-white/5 border border-primary-500/20 dark:border-white/10 text-primary-600 dark:text-primary-400 text-sm font-black mb-8 tracking-widest uppercase shadow-xl dark:shadow-2xl">
					<span class="w-2 h-2 rounded-full bg-primary-500"></span>
					{$i18n.t('features.pill')}
				</div>
				<h2 class="text-6xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter text-slate-900 dark:text-white">
					{$i18n.t('features.title_1')} <br/> {$i18n.t('features.title_2')} <br/> 
					<span class="bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 dark:from-primary-400 dark:via-white dark:to-primary-400 bg-clip-text text-transparent italic">{$i18n.t('features.title_3')}</span>
				</h2>
				<p class="text-slate-600 dark:text-slate-400 text-2xl mb-12 leading-tight font-medium max-w-lg">
					{$i18n.t('features.subtitle')}
				</p>

				<div class="flex gap-4 mb-16">
					<div class="w-16 h-[2px] bg-slate-200 dark:bg-surface-800 self-center"></div>
					<a href="#contact" class="group flex items-center gap-4 text-xl font-black text-slate-900 dark:text-white">
						{$i18n.t('services.btn_build')}
						<span class="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-surface-800 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all">→</span>
					</a>
				</div>
				
				<div class="grid grid-cols-2 gap-8">
					<div class="p-8 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-primary-500/50 transition-all shadow-lg dark:shadow-none">
						<div class="text-5xl font-black text-primary-600 dark:text-primary-500 mb-2 group-hover:scale-110 transition-transform">98%</div>
						<div class="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">{$i18n.t('features.stat_retention')}</div>
					</div>
					<div class="p-8 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-emerald-500/50 transition-all shadow-lg dark:shadow-none">
						<div class="text-5xl font-black text-emerald-600 dark:text-emerald-500 mb-2 group-hover:scale-110 transition-transform">&lt; 1s</div>
						<div class="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">{$i18n.t('features.stat_load')}</div>
					</div>
				</div>
			</div>

			<div class="grid sm:grid-cols-2 gap-8">
				{#each features as feature, i}
					<div bind:this={cards[i]} class="p-10 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[48px] hover:shadow-xl hover:border-primary-500/30 dark:hover:bg-white/[0.06] dark:hover:border-white/20 transition-all group">
						<div class="w-16 h-16 rounded-[24px] bg-primary-500/10 dark:bg-white/5 flex items-center justify-center {feature.color} mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/50">
							<feature.icon class="w-8 h-8" />
						</div>
						<h3 class="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">{feature.title}</h3>
						<p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Tech Stack Marquee -->
		<div bind:this={techStack} class="mt-32 pt-16 border-t border-slate-200/50 dark:border-white/5 opacity-0">
			<div class="flex flex-col md:flex-row items-center justify-between gap-12">
				<div class="max-w-xs text-center md:text-left">
					<h4 class="text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-4">{$i18n.t('features.tech_pill') || 'Our Ecosystem'}</h4>
					<p class="text-slate-600 dark:text-slate-400 font-medium">{$i18n.t('features.tech_desc') || 'We utilize the world\'s most advanced technologies to build your digital future.'}</p>
				</div>
				
				<div class="flex-1 w-full overflow-hidden relative">
					<div class="flex gap-16 animate-marquee whitespace-nowrap items-center">
						{#each Array(2) as _}
							<div class="flex gap-16 items-center">
								<span class="text-2xl font-black text-slate-300 dark:text-white/10 hover:text-blue-800 transition-colors uppercase italic scroll-m-20">WordPress</span>
								<span class="text-2xl font-black text-slate-300 dark:text-white/10 hover:text-blue-300 transition-colors uppercase italic">Bootstrap</span>
								<span class="text-2xl font-black text-slate-300 dark:text-white/10 hover:text-blue-500 transition-colors uppercase italic">React</span>
								<span class="text-2xl font-black text-slate-300 dark:text-white/10 hover:text-cyan-400 transition-colors uppercase italic">Tailwind</span>
								<span class="text-2xl font-black text-slate-300 dark:text-white/10 hover:text-violet-600 transition-colors uppercase italic">PHP</span>
								<span class="text-2xl font-black text-slate-300 dark:text-white/10 hover:text-yellow-600 transition-colors uppercase italic">Javascript</span>
							</div>
						{/each}
					</div>
					
					<div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-50 dark:from-slate-950 to-transparent z-10"></div>
					<div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-50 dark:from-slate-950 to-transparent z-10"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	.animate-marquee {
		animation: marquee 10s linear infinite;
	}
	.animate-marquee:hover {
		animation-play-state: paused;
	}
</style>
