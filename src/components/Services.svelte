<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonSettings from 'virtual:icons/carbon/settings';
	import IconCarbonCode from 'virtual:icons/carbon/code';
	import IconCarbonDevelopment from 'virtual:icons/carbon/development';
	import IconCarbonMobile from 'virtual:icons/carbon/mobile';
	import IconCarbonAnalytics from 'virtual:icons/carbon/analytics';
	import IconCarbonBrushFreehand from 'virtual:icons/carbon/brush-freehand';
	import { i18n } from '../i18n/store';

	let section: HTMLElement;
	let header: HTMLElement;
	let serviceCards: HTMLElement[] = $state([]);

	const services = $derived([
		{
			id: 'wordpress',
			icon: IconCarbonSettings,
			title: i18n.t('services.card_wp_title'),
			description: i18n.t('services.card_wp_desc'),
			color: 'text-blue-500',
			bg: 'bg-blue-50 dark:bg-blue-900/20'
		},
		{
			id: 'custom',
			icon: IconCarbonCode,
			title: i18n.t('services.card_custom_title'),
			description: i18n.t('services.card_custom_desc'),
			color: 'text-emerald-500',
			bg: 'bg-emerald-50 dark:bg-emerald-900/20'
		},
		{
			id: 'advanced',
			icon: IconCarbonDevelopment,
			title: i18n.t('services.card_digital_title'),
			description: i18n.t('services.card_digital_desc'),
			color: 'text-indigo-500',
			bg: 'bg-indigo-50 dark:bg-indigo-900/20'
		},
		{
			id: 'mobile',
			icon: IconCarbonMobile,
			title: i18n.t('services.card_mobile_title'),
			description: i18n.t('services.card_mobile_desc'),
			color: 'text-amber-500',
			bg: 'bg-amber-50 dark:bg-amber-900/20'
		},
		{
			id: 'seo',
			icon: IconCarbonAnalytics,
			title: i18n.t('services.card_seo_title'),
			description: i18n.t('services.card_seo_desc'),
			color: 'text-rose-500',
			bg: 'bg-rose-50 dark:bg-rose-900/20'
		},
		{
			id: 'design',
			icon: IconCarbonBrushFreehand,
			title: i18n.t('services.card_ui_title'),
			description: i18n.t('services.card_ui_desc'),
			color: 'text-purple-500',
			bg: 'bg-purple-50 dark:bg-purple-900/20'
		}
	]);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Header entrance - snappy
		gsap.from(header, {
			scrollTrigger: {
				trigger: section,
				start: "top 90%",
				toggleActions: "play none none reverse"
			},
			y: 30,
			opacity: 0,
			duration: 0.8
		});

		// Card reveals - snappy
		serviceCards.forEach((card, i) => {
			gsap.from(card, {
				scrollTrigger: {
					trigger: card,
					start: "top 95%",
					toggleActions: "play none none reverse"
				},
				y: 40,
				opacity: 0,
				duration: 0.6,
				delay: (i % 3) * 0.1,
				ease: "power2.out"
			});
			
			// Highlight focal point (Keep scroll active class for feel)
			gsap.to(card, {
				scrollTrigger: {
					trigger: card,
					start: "top 50%",
					end: "bottom 50%",
					toggleClass: "focal-active",
				}
			});
		});
	});
</script>

<style>
	:global(.focal-active) {
		transform: scale(1.02) translateY(-5px) !important;
		border-color: var(--color-primary-500) !important;
		box-shadow: 0 40px 80px -20px rgba(0,0,0,0.1) !important;
		background: white !important;
	}
	:global(.dark .focal-active) {
		background: var(--color-surface-800) !important;
	}
</style>

<section id="services" bind:this={section} class="section-padding bg-slate-50 dark:bg-surface-950 transition-colors duration-500 relative">
	<div class="container mx-auto px-4 relative z-10">
		<div bind:this={header} class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
			<div class="max-w-3xl">
				<div class="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-6">{$i18n.t('services.pill')}</div>
				<h2 class="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tight text-slate-900 dark:text-white">
					{$i18n.t('services.title_1')} <br/> 
					<span class="bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent italic">{$i18n.t('services.title_2')}</span>
				</h2>
				<p class="text-2xl text-slate-500 dark:text-slate-400 leading-tight font-medium max-w-xl">
					{$i18n.t('services.subtitle')}
				</p>
			</div>
			<div class="flex gap-4">
				<div class="w-16 h-[2px] bg-slate-200 dark:bg-surface-800 self-center"></div>
				<a href="#contact" class="group flex items-center gap-4 text-xl font-black text-slate-900 dark:text-white">
					{$i18n.t('services.btn_build')}
					<span class="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-surface-800 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all">→</span>
				</a>
			</div>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
			{#each services as service, i}
				<div 
					bind:this={serviceCards[i]} 
					id={service.id} 
					class="glass-card p-10 rounded-[48px] border-2 border-transparent transition-all duration-500 relative group cursor-default"
				>
					<div class="w-20 h-20 rounded-[32px] {service.bg} flex items-center justify-center {service.color} mb-12 shadow-xl shadow-black/[0.02] group-hover:scale-110 transition-transform duration-500">
						<service.icon class="w-10 h-10" />
					</div>
					
					<h3 class="text-2xl font-black mb-6 tracking-tight">{service.title}</h3>
					<p class="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
						{service.description}
					</p>

					<div class="mt-12 w-full h-1 bg-slate-100 dark:bg-surface-800 rounded-full overflow-hidden">
						<div class="h-full bg-primary-500 w-0 group-[.focal-active]:w-full transition-all duration-1000"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
