<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { i18n } from '../i18n/store.svelte.ts';

	let section: HTMLElement;
	let header: HTMLElement;
	let showcaseCards: HTMLElement[] = $state([]);

	const items = $derived([
		{
			image: '/sba-interactive/images/pizza-template.png',
			title: i18n.t('showcase.pizza_title'),
			desc: i18n.t('showcase.pizza_desc'),
			color: 'bg-[#E6F4F1] dark:bg-surface-800' // Minty pastel -> Dark surface
		},
		{
			image: '/sba-interactive/images/blog-template.png',
			title: i18n.t('showcase.blog_title'),
			desc: i18n.t('showcase.blog_desc'),
			color: 'bg-[#F3E8FF] dark:bg-surface-800' // Lavender pastel -> Dark surface
		},
		{
			image: '/sba-interactive/images/shop-template.png',
			title: i18n.t('showcase.shop_title'),
			desc: i18n.t('showcase.shop_desc'),
			color: 'bg-[#FDF2F8] dark:bg-surface-800' // Pink pastel -> Dark surface
		},
		{
			image: '/sba-interactive/images/saas-dashboard.png', // Placeholder due to quota
			title: i18n.t('showcase.saas_title'),
			desc: i18n.t('showcase.saas_desc'),
			color: 'bg-[#F0F9FF] dark:bg-surface-800' // Sky pastel -> Dark surface
		},
		{
			image: '/sba-interactive/images/nonprofit-organisation.png', // Placeholder due to quota
			title: i18n.t('showcase.npo_title'),
			desc: i18n.t('showcase.npo_desc'),
			color: 'bg-[#FFF7ED] dark:bg-surface-800' // Peach pastel -> Dark surface
		},
		{
			image: '/sba-interactive/images/luxury-hotel.png', // Placeholder due to quota
			title: i18n.t('showcase.hotel_title'),
			desc: i18n.t('showcase.hotel_desc'),
			color: 'bg-[#F5F3FF] dark:bg-surface-800' // Violet pastel -> Dark surface
		}
	]);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			if (header) {
				gsap.from(header, {
					scrollTrigger: {
						trigger: header,
						start: "top 95%",
						toggleActions: "play none none reverse"
					},
					y: 30,
					opacity: 0,
					duration: 0.8,
					ease: "power3.out"
				});
			}

			showcaseCards.filter(c => c !== null).forEach((card, i) => {
				gsap.from(card, {
					scrollTrigger: {
						trigger: card,
						start: "top 90%",
						toggleActions: "play none none reverse"
					},
					y: 50,
					opacity: 0,
					duration: 0.8,
					delay: (i % 3) * 0.1,
					ease: "power3.out"
				});
			});
		}, section);

		return () => ctx.revert();
	});
</script>

<section id="showcase" bind:this={section} class="section-padding bg-white dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
	<div class="container mx-auto px-4">
		<div bind:this={header} class="max-w-4xl mb-24">
			<div class="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-6">{$i18n.t('showcase.pill')}</div>
			<h2 class="text-6xl md:text-9xl font-black mb-10 leading-[0.8] tracking-tighter text-slate-900 dark:text-white">
				{$i18n.t('showcase.title_1')} <br/>
				<span class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{$i18n.t('showcase.title_2')}</span>
			</h2>
			<p class="text-2xl text-slate-500 dark:text-slate-400 leading-tight font-medium max-w-2xl">
				{$i18n.t('showcase.subtitle')}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each items as item, i}
				<div 
					bind:this={showcaseCards[i]}
					class="group relative aspect-[4/6.5] rounded-[64px] overflow-hidden cursor-pointer shadow-xl shadow-black/[0.02]"
				>
					<!-- Card Background -->
					<div class="absolute inset-0 {item.color} transition-all duration-700 group-hover:scale-105 border border-transparent dark:border-surface-700/50"></div>
					
					<!-- Image Container -->
					<div class="aspect-[4/5] absolute inset-x-8 top-8 bottom-32 rounded-[10px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:-translate-y-4 border border-white/20">
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
