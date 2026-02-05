<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView, stagger } from 'motion';
	import { i18n } from '../i18n/store.svelte.ts';
	import IconCarbonCamera from 'virtual:icons/carbon/camera';
	import IconCarbonColorPalette from 'virtual:icons/carbon/color-palette';
	import IconCarbonImageSearch from 'virtual:icons/carbon/image-search';
    import IconCarbonInventoryManagement from 'virtual:icons/carbon/inventory-management';
    import IconCarbonMoney from 'virtual:icons/carbon/money';

	let section: HTMLElement;
	let content: HTMLElement;
	let imageContainer: HTMLElement;
	let cards: HTMLElement[] = $state([]);

	const benefits = [
		{
			title: i18n.t('graphics.benefit_1_title'),
			description: i18n.t('graphics.benefit_1_desc'),
			icon: IconCarbonCamera,
			color: 'text-rose-500'
		},
		{
			title: i18n.t('graphics.benefit_2_title'),
			description: i18n.t('graphics.benefit_2_desc'),
			icon: IconCarbonColorPalette,
			color: 'text-violet-500'
		},
		{
			title: i18n.t('graphics.benefit_3_title'),
			description: i18n.t('graphics.benefit_3_desc'),
			icon: IconCarbonImageSearch,
			color: 'text-amber-500'
		}
	];

	onMount(() => {
		if (content) {
			inView(content, () => {
				animate(content, 
					{ y: [30, 0], opacity: [0, 1] }, 
					{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }
				);
			}, { margin: "-10% 0px -10% 0px" });
		}

		if (imageContainer) {
			inView(imageContainer, () => {
				animate(imageContainer, 
					{ scale: [0.95, 1], opacity: [0, 1] }, 
					{ duration: 1, ease: "ease-out" }
				);
			}, { margin: "-10% 0px -10% 0px" });
		}

		if (cards.length > 0) {
			inView(section, () => {
				animate(cards, 
					{ y: [20, 0], opacity: [0, 1] }, 
					{ delay: stagger(0.1), duration: 0.6, ease: "ease-out" }
				);
			});
		}
	});
</script>

<section id="graphics" bind:this={section} class="section-padding bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
	
	<!-- Background Accents -->
	<div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-500/5 to-transparent pointer-events-none"></div>
	<div class="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="grid lg:grid-cols-2 gap-20 items-center">
			
			<!-- Image Side -->
			<div bind:this={imageContainer} class="relative order-2 lg:order-1">
				<div class="relative rounded-[64px] overflow-hidden shadow-2xl border-[12px] border-white dark:border-white/5 group transition-transform duration-700 hover:scale-[1.01]">
					<img 
						src="images/graphics_lifestyle.png" 
						alt="Premium Visual Identity" 
						class="w-full h-full object-cover aspect-square md:aspect-[4/3] lg:aspect-square group-hover:scale-110 transition-transform duration-1000"
					/>
					
					<!-- Overlay Glass Card -->
					<div class="absolute bottom-8 left-8 right-8 p-2 md:px-4 lg:px-8 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl">
						<div class="flex items-center gap-6">
							<div class="p-4 bg-white/20 rounded-2xl">
								<IconCarbonCamera class="w-8 h-8 text-white" />
							</div>
							<div>
								<div class="text-xl md:text-2xl xl:text-4xl font-black text-white">{$i18n.t('graphics.card_title')}</div>
								<div class="text-xs md:text-md xl:text-lg font-bold text-white/70 uppercase tracking-widest">{$i18n.t('graphics.card_subtitle')}</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Decorative Elements -->
				<div class="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div class="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
			</div>

			<!-- Content Side -->
			<div bind:this={content} class="order-1 lg:order-2">
				<div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-black mb-8 tracking-widest uppercase">
					<span class="w-2 h-2 rounded-full bg-rose-500"></span>
					{$i18n.t('graphics.pill')}
				</div>
				
				<h2 class="text-6xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter text-slate-900 dark:text-white">
					{$i18n.t('graphics.title_1')} <br/>
					<span class="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 bg-clip-text text-transparent italic pr-4">
						{$i18n.t('graphics.title_2')}
					</span>
					{$i18n.t('graphics.title_3')}
				</h2>
				
				<p class="text-slate-600 dark:text-slate-400 text-2xl mb-12 leading-tight font-medium max-w-lg">
					{$i18n.t('graphics.subtitle')}
				</p>

				<div class="flex gap-4 mb-16">
					<div class="w-16 h-[2px] bg-slate-200 dark:bg-surface-800 self-center"></div>
					<a href="#contact" class="group flex items-center gap-4 text-xl font-black text-slate-900 dark:text-white">
						{$i18n.t('services.btn_build')}
						<span class="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-surface-800 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all">→</span>
					</a>
				</div>

				<div class="space-y-6">
					{#each benefits as benefit, i}
						<div 
							bind:this={cards[i]} 
							class="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[32px] flex items-center gap-6 hover:bg-white dark:hover:bg-white/[0.05] hover:shadow-xl transition-all group"
						>
							<div class="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 shadow-lg flex items-center justify-center {benefit.color} group-hover:scale-110 transition-transform">
								<benefit.icon class="w-8 h-8" />
							</div>
							<div>
								<h3 class="text-xl font-black text-slate-900 dark:text-white mb-1">{benefit.title}</h3>
								<p class="text-slate-500 dark:text-slate-400 font-medium leading-tight">{benefit.description}</p>
							</div>
						</div>
					{/each}
				</div>
				
				<div class="mt-12 grid grid-cols-2 gap-8">
					<div class="p-8 bg-rose-500/5 border border-rose-500/10 rounded-[32px]">
						<div class="text-4xl font-black text-rose-600 dark:text-rose-500 mb-1"><IconCarbonInventoryManagement class="w-10 h-10" /></div>
						<div class="text-xs font-black text-slate-400 uppercase tracking-widest">{$i18n.t('graphics.stat_assets')}</div>
					</div>
					<div class="p-8 bg-amber-500/5 border border-amber-500/10 rounded-[32px]">
						<div class="text-4xl font-black text-amber-600 dark:text-amber-500 mb-1"><IconCarbonMoney class="w-10 h-10" /></div>
						<div class="text-xs font-black text-slate-400 uppercase tracking-widest">{$i18n.t('graphics.stat_conversion')}</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

<style>
:global(.dark) #graphics {
	background-image: 
		radial-gradient(circle at 2px 2px, rgba(255,255,255,0.01) 1px, transparent 0);
	background-size: 40px 40px;
}
</style>
