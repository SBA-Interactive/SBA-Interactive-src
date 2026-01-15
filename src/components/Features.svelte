<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonCloudDownload from 'virtual:icons/carbon/cloud-download';
	import IconCarbonRocket from 'virtual:icons/carbon/rocket';
	import IconCarbonUserFavorite from 'virtual:icons/carbon/user-favorite';
	import IconCarbonSecurity from 'virtual:icons/carbon/security';
	import { i18n } from '../i18n/store.svelte.ts';

	let section: HTMLElement;
	let cards: HTMLElement[] = $state([]);
	let textContent: HTMLElement;

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
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			if (textContent) {
				gsap.from(textContent, {
					scrollTrigger: {
						trigger: textContent,
						start: "top 95%",
						toggleActions: "play none none reverse"
					},
					y: 20,
					opacity: 0,
					duration: 0.6,
					ease: "power2.out",
					overwrite: 'auto'
				});
			}

			cards.filter(c => c !== null).forEach((card, i) => {
				gsap.from(card, {
					scrollTrigger: {
						trigger: card,
						start: "top 98%",
						toggleActions: "play none none reverse"
					},
					y: 20,
					opacity: 0,
					duration: 0.4,
					delay: Math.min(i * 0.05, 0.2),
					ease: "power1.out",
					overwrite: 'auto'
				});
			});
		}, section);

		return () => ctx.revert();
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
				<p class="text-slate-600 dark:text-slate-400 text-2xl mb-16 leading-tight font-medium max-w-lg">
					{$i18n.t('features.subtitle')}
				</p>
				
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
	</div>
</section>
