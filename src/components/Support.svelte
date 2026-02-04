<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';
	import { i18n } from '../i18n/store.svelte.ts';
	import IconCarbonChat from 'virtual:icons/carbon/chat';
	import IconCarbonEventSchedule from 'virtual:icons/carbon/event-schedule';

	let section: HTMLElement;
	let content: HTMLElement;
	let imageContainer: HTMLElement;

	onMount(() => {
		if (section && content && imageContainer) {
			inView(section, () => {
				animate(content, 
					{ x: [-50, 0], opacity: [0, 1] }, 
					{ duration: 1, easing: "ease-out" }
				);
				animate(imageContainer, 
					{ scale: [0.9, 1], opacity: [0, 1] }, 
					{ duration: 1.2, easing: [0.16, 1, 0.3, 1] }
				);
			}, { margin: "-20% 0px -20% 0px" });
		}
	});
</script>

<section id="support" bind:this={section} class="section-padding bg-slate-50 dark:bg-surface-900 transition-colors duration-500 overflow-hidden">
	<div class="container mx-auto px-4">
		<div class="flex flex-col lg:flex-row items-center gap-20">
			<!-- Image Side -->
			<div bind:this={imageContainer} class="relative w-full lg:w-1/2">
				<div class="absolute -inset-4 bg-primary-200/50 dark:bg-primary-900/20 rounded-[64px] blur-3xl"></div>
				<div class="relative rounded-[56px] overflow-hidden shadow-2xl border-8 border-white dark:border-surface-800 transition-transform duration-700 hover:scale-[1.02]">
					<img 
						src="images/support-team.webp" 
						alt="Our Support Team" 
						class="w-full h-full object-cover aspect-square md:aspect-video lg:aspect-square"
					/>
				</div>
				<!-- Floating Stat -->
				<div class="absolute -bottom-10 -right-10 bg-white dark:bg-surface-800 p-8 rounded-[32px] shadow-2xl hidden md:block">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600">
							<IconCarbonEventSchedule class="w-6 h-6" />
						</div>
						<div>
							<div class="text-3xl font-black text-slate-900 dark:text-white">24/7</div>
							<div class="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Support</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Content Side -->
			<div bind:this={content} class="w-full lg:w-1/2">
				<div class="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-6">{$i18n.t('support.pill')}</div>
				<h2 class="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tight text-slate-900 dark:text-white">
					{$i18n.t('support.title_1')} <br/>
					<span class="bg-gradient-to-r from-emerald-500 to-primary-600 bg-clip-text text-transparent italic">{$i18n.t('support.title_2')}</span>
				</h2>
				<p class="text-2xl text-slate-500 dark:text-slate-400 leading-tight font-medium max-w-xl mb-12">
					{$i18n.t('support.subtitle')}
				</p>

				<div class="grid sm:grid-cols-2 gap-8 mb-12">
					<div class="p-8 rounded-[32px] bg-white dark:bg-surface-800 shadow-xl shadow-black/[0.02]">
						<div class="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 mb-6">
							<IconCarbonChat class="w-8 h-8" />
						</div>
						<h3 class="text-xl font-black mb-2 text-slate-900 dark:text-white">{$i18n.t('support.benefit_1_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 font-medium">{$i18n.t('support.benefit_1_desc')}</p>
					</div>
					<div class="p-8 rounded-[32px] bg-white dark:bg-surface-800 shadow-xl shadow-black/[0.02]">
						<div class="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 mb-6">
							<IconCarbonEventSchedule class="w-8 h-8" />
						</div>
						<h3 class="text-xl font-black mb-2 text-slate-900 dark:text-white">{$i18n.t('support.benefit_2_title')}</h3>
						<p class="text-slate-500 dark:text-slate-400 font-medium">{$i18n.t('support.benefit_2_desc')}</p>
					</div>
				</div>

				<a 
					href="#contact" 
					class="inline-flex items-center gap-4 py-6 px-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xl font-black transition-transform hover:scale-105"
				>
					{$i18n.t('support.btn')}
					<span>→</span>
				</a>
			</div>
		</div>
	</div>
</section>
