<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';
	import IconCarbonCheckmarkFilled from 'virtual:icons/carbon/checkmark-filled';
	import { i18n } from '../i18n/store.svelte.ts';

	let section: HTMLElement;
	let header: HTMLElement;


	const plans = $derived([
		{
			id: 'wordpress',
			name: i18n.t('pricing.plan_starter_name'),
			price: '999',
			description: i18n.t('pricing.plan_starter_desc'),
			features: [
				i18n.t('pricing.plan_starter_f1'),
				i18n.t('pricing.plan_starter_f2'),
				i18n.t('pricing.plan_starter_f3'),
				i18n.t('pricing.plan_starter_f4'),
				i18n.t('pricing.plan_starter_f5')
			],
			isPopular: false
		},
		{
			id: 'custom_web',
			name: i18n.t('pricing.plan_pro_name'),
			price: '2499',
			description: i18n.t('pricing.plan_pro_desc'),
			features: [
				i18n.t('pricing.plan_pro_f1'),
				i18n.t('pricing.plan_pro_f2'),
				i18n.t('pricing.plan_pro_f3'),
				i18n.t('pricing.plan_pro_f4'),
				i18n.t('pricing.plan_pro_f5'),
				i18n.t('pricing.plan_pro_f6')
			],
			isPopular: true
		},
		{
			id: 'advanced',
			name: i18n.t('pricing.plan_advanced_name'),
			price: '4999',
			description: i18n.t('pricing.plan_advanced_desc'),
			features: [
				i18n.t('pricing.plan_advanced_f1'),
				i18n.t('pricing.plan_advanced_f2'),
				i18n.t('pricing.plan_advanced_f3'),
				i18n.t('pricing.plan_advanced_f4'),
				i18n.t('pricing.plan_advanced_f5'),
				i18n.t('pricing.plan_advanced_f6')
			],
			isPopular: false
		},
		{
			id: 'bespoke',
			name: i18n.t('pricing.plan_custom_name'),
			price: '9999',
			description: i18n.t('pricing.plan_custom_desc'),
			features: [
				i18n.t('pricing.plan_custom_f1'),
				i18n.t('pricing.plan_custom_f2'),
				i18n.t('pricing.plan_custom_f3'),
				i18n.t('pricing.plan_custom_f4'),
				i18n.t('pricing.plan_custom_f5'),
				i18n.t('pricing.plan_custom_f6')
			],
			isPopular: false
		}
	]);

	function fadeIn(node: HTMLElement, delay = 0) {
		const stop = inView(node, () => {
			animate(node, 
				{ y: [20, 0], opacity: [0, 1] }, 
				{ duration: 0.4, delay, easing: "ease-out" }
			);
		}, { margin: "0px 0px -2% 0px" });

		return {
			destroy() {
				stop();
			}
		};
	}

	onMount(() => {
		if (header) {
			inView(header, () => {
				animate(header, 
					{ y: [20, 0], opacity: [0, 1] }, 
					{ duration: 0.4, easing: "ease-out" }
				);
			}, { margin: "-5% 0px -5% 0px" });
		}
	});
</script>

<section id="pricing" bind:this={section} class="section-padding bg-surface-50 dark:bg-slate-950 transition-colors duration-500">
	<div class="container mx-auto px-4">
		<div bind:this={header} class="text-center max-w-3xl mx-auto mb-20 text-balance">
			<div class="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-6">{$i18n.t('pricing.pill')}</div>
			<h2 class="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">{$i18n.t('pricing.title_1')} <span class="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent italic">{$i18n.t('pricing.title_2')}</span></h2>
			<p class="text-xl text-slate-500 dark:text-slate-400 font-medium">
				{$i18n.t('pricing.subtitle')}
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 mb-8">
			{#each plans.slice(0, 3) as plan, i}
				<div use:fadeIn={i * 0.05} class="bg-white dark:bg-surface-900 p-10 rounded-[56px] flex flex-col relative transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary-500/10 {plan.isPopular ? 'border-2 border-primary-500 shadow-primary-500/5 lg:-translate-y-6' : 'border border-slate-200 dark:border-white/5 hover:-translate-y-2'}">
					{#if plan.isPopular}
						<span class="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-primary-600/30">{@html $i18n.t('pricing.most_popular').replace(' ', '&nbsp;')}</span>
					{/if}

					<div class="mb-10">
						<h3 class="text-3xl font-black mb-3 tracking-tight text-slate-900 dark:text-white">{plan.name}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">{plan.description}</p>
					</div>

					<div class="mb-10 pb-10 border-b border-slate-100 dark:border-surface-800">
						<div class="flex items-baseline gap-2">
							<span class="text-1xl font-bold text-slate-400">$</span>
							<span class="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">{plan.price}</span>
							<span class="text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-widest">{$i18n.t('pricing.base')}</span>
						</div>
					</div>

					<ul class="space-y-6 mb-12 flex-grow">
						{#each plan.features as feature}
							<li class="flex items-start gap-4 text-slate-700 dark:text-slate-300">
								<div class="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
									<IconCarbonCheckmarkFilled class="w-4 h-4 text-primary-500" />
								</div>
								<span class="text-base font-bold leading-tight">{feature}</span>
							</li>
						{/each}
					</ul>

					<a 
						href="#contact" 
						class="w-full py-6 text-center text-xl font-black rounded-[32px] transition-all {plan.isPopular ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-2xl shadow-primary-500/20 active:scale-95' : 'border-4 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 active:scale-95'}"
					>
						{$i18n.t('pricing.btn_start')}
					</a>
				</div>
			{/each}
		</div>


		<div use:fadeIn class="bg-white dark:bg-surface-900 p-10 lg:p-12 rounded-[56px] shadow-2xl flex flex-col lg:flex-row items-center gap-12 relative transition-all duration-500 hover:shadow-primary-500/10 hover:-translate-y-2 border-2 border-indigo-500/50 dark:border-indigo-400/30">
			<div class="flex-1 lg:border-r border-slate-100 dark:border-surface-800 lg:pr-12 text-slate-900 dark:text-white">
				<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
					Enterprise Solution
				</div>
				<h3 class="text-4xl lg:text-5xl font-black mb-4 tracking-tight">{plans[3].name}</h3>
				<p class="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium max-w-xl">{plans[3].description}</p>
				
				<div class="mt-10 flex items-baseline gap-2">
					<span class="text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tighter">{$i18n.t('pricing.individual').toUpperCase()}</span>
				</div>
			</div>

			<div class="flex-1 w-full text-slate-700 dark:text-slate-300">
				<ul class="grid sm:grid-cols-2 gap-x-12 gap-y-6 mb-10">
					{#each plans[3].features as feature}
						<li class="flex items-start gap-4 text-slate-700 dark:text-slate-300">
							<div class="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
								<IconCarbonCheckmarkFilled class="w-4 h-4 text-indigo-500" />
							</div>
							<span class="text-base font-bold leading-tight">{feature}</span>
						</li>
					{/each}
				</ul>

				<a 
					href="#contact" 
					class="inline-block px-12 py-6 text-center text-xl font-black rounded-[32px] transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95 shadow-2xl"
				>
					Contact for Custom Quote
				</a>
			</div>
		</div>
	</div>
</section>
