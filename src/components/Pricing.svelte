<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonCheckmarkFilled from 'virtual:icons/carbon/checkmark-filled';

	let section: HTMLElement;
	let header: HTMLElement;
	let cards: HTMLElement[] = $state([]);

	const plans = [
		{
			id: 'wordpress',
			name: 'WordPress Starter',
			price: '999',
			description: 'Perfect for small businesses and personal blogs.',
			features: [
				'Custom Theme Design',
				'Responsive Layout',
				'SEO Optimization',
				'Basic Plugin Setup',
				'3 Months Support'
			],
			isPopular: false
		},
		{
			id: 'custom',
			name: 'Custom Web Pro',
			price: '2499',
			description: 'High-performance static sites for growing brands.',
			features: [
				'HTML5 / CSS3 / JS',
				'Astro or Next.js Framework',
				'Ultra-fast Performance',
				'Advanced Animations',
				'Contact Form Integration',
				'6 Months Support'
			],
			isPopular: true
		},
		{
			id: 'advanced',
			name: 'Advanced Digital',
			price: '4999',
			description: 'Full-scale web applications and SaaS products.',
			features: [
				'Full-stack Development',
				'Scalable Architecture',
				'Custom Dashboard',
				'Database Integration',
				'User Authentication',
				'Priority Support'
			],
			isPopular: false
		}
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Header entrance - START EARLIER, NO BLUR
		gsap.from(header, {
			scrollTrigger: {
				trigger: section,
				start: "top 95%",
				end: "top 75%",
				scrub: 1
			},
			y: 40,
			opacity: 0,
			duration: 1
		});

		// Card entrance - START EARLIER, NO BLUR
		gsap.from(cards, {
			scrollTrigger: {
				trigger: section,
				start: "top 85%",
				end: "top 60%",
				scrub: 1.5
			},
			y: 60,
			opacity: 0,
			scale: 0.95,
			stagger: 0.2
		});
	});
</script>

<section id="pricing" bind:this={section} class="section-padding bg-surface-50 dark:bg-surface-950 transition-colors duration-500">
	<div class="container mx-auto px-4">
		<div bind:this={header} class="text-center max-w-3xl mx-auto mb-20 text-balance">
			<div class="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-6">Investment</div>
			<h2 class="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">Transparent <span class="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent italic">Pricing.</span></h2>
			<p class="text-xl text-slate-500 dark:text-slate-400 font-medium">
				Elite engineering shouldn't be a mystery. Choose a plan that fuels your next phase of growth.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-10">
			{#each plans as plan, i}
				<div bind:this={cards[i]} class="glass-card p-10 rounded-[56px] flex flex-col relative transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 {plan.isPopular ? 'border-primary-500 shadow-xl shadow-primary-500/5 lg:-translate-y-6' : 'hover:-translate-y-2'}">
					{#if plan.isPopular}
						<span class="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-primary-600/30">Most Popular</span>
					{/if}

					<div class="mb-10">
						<h3 class="text-3xl font-black mb-3 tracking-tight">{plan.name}</h3>
						<p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">{plan.description}</p>
					</div>

					<div class="mb-10 pb-10 border-b border-slate-100 dark:border-surface-800">
						<div class="flex items-baseline gap-2">
							<span class="text-1xl font-bold text-slate-400">$</span>
							<span class="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">{plan.price}</span>
							<span class="text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-widest">Base</span>
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
						Get Started
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
