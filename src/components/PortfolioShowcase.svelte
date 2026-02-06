<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView, stagger } from 'motion';
	import { i18n } from '../i18n/store.svelte.ts';

	let section: HTMLElement;
	let header: HTMLElement;
	let showcaseCards: HTMLElement[] = $state([]);

	const items = $derived([
		{
			image: 'images/pizza-template.webp',
			title: i18n.t('showcase.pizza_title'),
			desc: i18n.t('showcase.pizza_desc'),
			color: 'bg-emerald-100 dark:bg-teal-950'
		},
		{
			image: 'images/blog-template.webp',
			title: i18n.t('showcase.blog_title'),
			desc: i18n.t('showcase.blog_desc'),
			color: 'bg-indigo-100 dark:bg-indigo-950'
		},
		{
			image: 'images/shop-template.webp',
			title: i18n.t('showcase.shop_title'),
			desc: i18n.t('showcase.shop_desc'),
			color: 'bg-blue-100 dark:bg-slate-600'
		},
		{
			image: 'images/saas-dashboard.webp',
			title: i18n.t('showcase.saas_title'),
			desc: i18n.t('showcase.saas_desc'),
			color: 'bg-blue-200 dark:bg-slate-950'
		},
		{
			image: 'images/nonprofit-organisation.webp',
			title: i18n.t('showcase.npo_title'),
			desc: i18n.t('showcase.npo_desc'),
			color: 'bg-lime-100 dark:bg-green-950'
		},
		{
			image: 'images/luxury-hotel.webp',
			title: i18n.t('showcase.hotel_title'),
			desc: i18n.t('showcase.hotel_desc'),
			color: 'bg-slate-300 dark:bg-slate-900'
		}
	]);

	onMount(() => {
		// Header animation with staggered children
		if (header) {
			const headerChildren = header.children;
			inView(header, () => {
				header.style.opacity = '1';
				animate(Array.from(headerChildren), 
					{ y: [30, 0], opacity: [0, 1] } as any, 
					{ delay: stagger(0.12), duration: 0.8, easing: [0.22, 1, 0.36, 1] }
				);
			}, { amount: 0.2 });
		}

		// Cards animation with stagger
		if (section) {
			inView(section, () => {
				animate(showcaseCards, 
					{ y: [40, 0], opacity: [0, 1] } as any, 
					{ delay: stagger(0.1, { start: 0.2 }), duration: 0.8, easing: [0.22, 1, 0.36, 1] }
				);
			}, { amount: 0.1 });
		}
	});
</script>

<section id="showcase" bind:this={section} class="section-padding bg-white dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
	<div class="container mx-auto px-4">
		<div bind:this={header} class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 opacity-0">
			<div class="max-w-4xl">
				<!-- <div class="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-6">{$i18n.t('showcase.pill')}</div> -->
				<h2 class="text-6xl md:text-9xl font-black mb-10 leading-[0.8] tracking-tighter text-slate-900 dark:text-white">
					{$i18n.t('showcase.title_1')} <br/>
					<span class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{$i18n.t('showcase.title_2')}</span>
				</h2>
				<p class="text-2xl text-slate-500 dark:text-slate-400 leading-tight font-medium max-w-2xl">
					{$i18n.t('showcase.subtitle')}
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

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each items as item, i}
				<div 
					bind:this={showcaseCards[i]}
					class="group relative aspect-[4/6.5] rounded-[32px] overflow-hidden shadow-xl shadow-black/[0.02]"
				>
					<!-- Card Background -->
					<div class="absolute inset-0 {item.color} transition-all duration-700 group-hover:scale-105 border border-transparent dark:border-surface-700/50"></div>
					
					<!-- Image Container -->
					<div class="aspect-[4/5] absolute inset-x-8 top-8 bottom-32 rounded-[24px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:-translate-y-4 border border-white/20">
						<img 
							src={item.image} 
							alt={item.title} 
							class="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Text Content -->
					<div class="absolute inset-x-12 bottom-12">
						<h3 class="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">{item.title}</h3>
						<p class="text-slate-600 dark:text-slate-400 font-bold leading-tight transition-colors">{item.desc}</p>
					</div>

					<!-- Hover Overlay -->
					<div class="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-500"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	:global(.section-padding) {
		padding: 160px 0;
	}
	@media (max-width: 768px) {
		:global(.section-padding) {
			padding: 80px 0;
		}
	}
</style>
