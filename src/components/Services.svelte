<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView, stagger } from 'motion';
	import IconCarbonSettings from 'virtual:icons/carbon/settings';
	import IconCarbonCode from 'virtual:icons/carbon/code';
	import IconCarbonDevelopment from 'virtual:icons/carbon/development';
	import IconCarbonMobile from 'virtual:icons/carbon/mobile';
	import IconCarbonAnalytics from 'virtual:icons/carbon/analytics';
	import IconCarbonBrushFreehand from 'virtual:icons/carbon/brush-freehand';
	import { i18n } from '../i18n/store.svelte.ts';

	const baseUrl = import.meta.env.BASE_URL;
	const readMoreText = $derived(i18n.t('read_more'));

	let section: HTMLElement;
	let header: HTMLElement;
	let serviceCards: HTMLElement[] = $state([]);

	const services = $derived([
		{
			id: 'wordpress',
			slug: 'wordpress',
			icon: IconCarbonSettings,
			title: i18n.t('services.card_wp_title'),
			description: i18n.t('services.card_wp_desc'),
			color: 'text-blue-800 dark:text-blue-100',
			bg: 'bg-[var(--color-pastel-blue)] dark:bg-[var(--color-pastel-blue-dark)]'
		},
		{
			id: 'custom-solutions',
			slug: 'custom-solutions',
			icon: IconCarbonCode,
			title: i18n.t('services.card_custom_title'),
			description: i18n.t('services.card_custom_desc'),
			color: 'text-emerald-800 dark:text-emerald-100',
			bg: 'bg-[var(--color-pastel-green)] dark:bg-[var(--color-pastel-green-dark)]'
		},
		{
			id: 'products',
			slug: 'digital-products',
			icon: IconCarbonDevelopment,
			title: i18n.t('services.card_digital_title'),
			description: i18n.t('services.card_digital_desc'),
			color: 'text-purple-800 dark:text-purple-100',
			bg: 'bg-[var(--color-pastel-purple)] dark:bg-[var(--color-pastel-purple-dark)]'
		},
		{
			id: 'mobile',
			slug: 'mobile-apps',
			icon: IconCarbonMobile,
			title: i18n.t('services.card_mobile_title'),
			description: i18n.t('services.card_mobile_desc'),
			color: 'text-orange-800 dark:text-orange-100',
			bg: 'bg-[var(--color-pastel-orange)] dark:bg-[var(--color-pastel-orange-dark)]'
		},
		{
			id: 'seo',
			slug: 'seo-performance',
			icon: IconCarbonAnalytics,
			title: i18n.t('services.card_seo_title'),
			description: i18n.t('services.card_seo_desc'),
			color: 'text-rose-800 dark:text-rose-100',
			bg: 'bg-[var(--color-pastel-rose)] dark:bg-[var(--color-pastel-rose-dark)]'
		},
		{
			id: 'design',
			slug: 'ui-ux-design',
			icon: IconCarbonBrushFreehand,
			title: i18n.t('services.card_ui_title'),
			description: i18n.t('services.card_ui_desc'),
			color: 'text-pink-800 dark:text-pink-100',
			bg: 'bg-[var(--color-pastel-pink)] dark:bg-[var(--color-pastel-pink-dark)]'
		}
	]);

	onMount(() => {
		// Header animation with staggered children
		if (header) {
			const headerChildren = header.querySelectorAll(':scope > div');
			inView(header, () => {
				header.style.opacity = '1';
				animate(Array.from(headerChildren), 
					{ y: [30, 0], opacity: [0, 1] } as any, 
					{ delay: stagger(0.1), duration: 0.8, easing: [0.22, 1, 0.36, 1] }
				);
			}, { amount: 0.2 });
		}

		// Cards entrance animation with better stagger
		inView(section, () => {
			animate(serviceCards, 
				{ y: [40, 0], opacity: [0, 1] } as any, 
				{ delay: stagger(0.08, { start: 0.1 }), duration: 0.7, easing: [0.22, 1, 0.36, 1] }
			);
		}, { amount: 0.1 });

		// Focal active effect on scroll
		serviceCards.forEach((card) => {
			if (card) {
				inView(card, ({ target }) => {
					target.classList.add('focal-active');
					return () => target.classList.remove('focal-active');
				}, { amount: 0.6 }); // Trigger when 60% in view
			}
		});
	});
</script>

<style>
	:global(.focal-active),
	.service-card:hover {
		transform: scale(1.02) translateY(-5px) !important;
		border-color: var(--color-primary-500) !important;
		box-shadow: 0 40px 80px -20px rgba(0,0,0,0.1) !important;
		background: white !important;
	}
	:global(.dark .focal-active),
	:global(.dark) .service-card:hover {
		background: var(--color-surface-800) !important;
	}
	
	.service-card:hover :global(.progress-bar) {
		width: 100% !important;
	}
</style>

<section id="services" bind:this={section} class="section-padding bg-slate-50 dark:bg-surface-950 transition-colors duration-500 relative">
	<div class="container mx-auto px-4 relative z-10">
		<div bind:this={header} class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 opacity-0">
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
					class="service-card glass-card p-10 rounded-[48px] border-2 border-transparent transition-all duration-500 relative group cursor-default"
				>
					<div class="w-20 h-20 rounded-[32px] {service.bg} flex items-center justify-center {service.color} mb-12 shadow-xl shadow-black/[0.02] group-hover:scale-110 transition-transform duration-500">
						<service.icon class="w-10 h-10" />
					</div>
					
					<h3 class="text-2xl font-black mb-6 tracking-tight">{service.title}</h3>
					<p class="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
						{service.description}
					</p>

					<div class="mt-12 w-full flex items-center gap-4">
						<div class="w-1/2 h-1 bg-slate-100 dark:bg-surface-800 rounded-full overflow-hidden">
							<div class="progress-bar h-full bg-primary-500 w-0 group-[.focal-active]:w-full transition-all duration-400"></div>
						</div>
						<div class="w-1/2">
							<a href={`${baseUrl}articles/${service.id}`} class="group font-semibold flex items-center gap-4 text-xl text-blue-500 dark:text-blue-400 hover:text-cyan-600 dark:hover:text-cyan-200 leading-relaxed tracking-widest">{$i18n.t('read_more')}<span aria-hidden="false" class="sr-only"> Read more about {service.title} ~ <span aria-hidden="true">Author: SBA INTERACTIVE</span></span> </a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
