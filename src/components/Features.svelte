<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonCloudDownload from 'virtual:icons/carbon/cloud-download';
	import IconCarbonRocket from 'virtual:icons/carbon/rocket';
	import IconCarbonUserFavorite from 'virtual:icons/carbon/user-favorite';
	import IconCarbonSecurity from 'virtual:icons/carbon/security';

	let section: HTMLElement;
	let cards: HTMLElement[] = $state([]);
	let textContent: HTMLElement;

	const features = [
		{
			title: 'Lightning Speed',
			description: 'Optimized for Core Web Vitals with 100/100 Lighthouse scores.',
			icon: IconCarbonRocket,
			color: 'text-orange-500'
		},
		{
			title: 'SEO Optimized',
			description: 'Built-in schema markup and semantic HTML for top rankings.',
			icon: IconCarbonCloudDownload,
			color: 'text-blue-500'
		},
		{
			title: 'Expert Support',
			description: 'On-demand technical assistance and post-launch maintenance.',
			icon: IconCarbonUserFavorite,
			color: 'text-purple-500'
		},
		{
			title: 'Security First',
			description: 'WAF integration and secure coding practices for every project.',
			icon: IconCarbonSecurity,
			color: 'text-emerald-500'
		}
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Header entrance - Fast and early
		gsap.from(textContent, {
			scrollTrigger: {
				trigger: section,
				start: "top 90%",
				toggleActions: "play none none reverse"
			},
			y: 30,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out"
		});

		// Card Reveal - Fast and early
		cards.forEach((card, i) => {
			gsap.from(card, {
				scrollTrigger: {
					trigger: card,
					start: "top 95%",
					toggleActions: "play none none reverse"
				},
				y: 40,
				opacity: 0,
				duration: 0.6,
				delay: i * 0.1,
				ease: "power2.out"
			});
		});
	});
</script>

<section id="why-us" bind:this={section} class="section-padding bg-slate-950 text-white overflow-hidden relative">
	<!-- Decorative grid -->
	<div class="feature-grid-bg absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="grid lg:grid-cols-2 gap-24 items-center">
			<div bind:this={textContent}>
				<div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-black mb-8 tracking-widest uppercase shadow-2xl">
					<span class="w-2 h-2 rounded-full bg-primary-500"></span>
					The Elite Difference
				</div>
				<h2 class="text-6xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter">
					Why elite <br/> brands <br/> 
					<span class="bg-gradient-to-r from-primary-400 via-white to-primary-400 bg-clip-text text-transparent italic">choose us.</span>
				</h2>
				<p class="text-slate-400 text-2xl mb-16 leading-tight font-medium max-w-lg">
					We engineer digital competitive advantages. Faster, safer, and infinitely more scalable.
				</p>
				
				<div class="grid grid-cols-2 gap-8">
					<div class="p-8 bg-white/[0.03] border border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-primary-500/50 transition-all">
						<div class="text-5xl font-black text-primary-500 mb-2 group-hover:scale-110 transition-transform">98%</div>
						<div class="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Client Retention</div>
					</div>
					<div class="p-8 bg-white/[0.03] border border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-emerald-500/50 transition-all">
						<div class="text-5xl font-black text-emerald-500 mb-2 group-hover:scale-110 transition-transform">&lt; 1s</div>
						<div class="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Load Time</div>
					</div>
				</div>
			</div>

			<div class="grid sm:grid-cols-2 gap-8">
				{#each features as feature, i}
					<div bind:this={cards[i]} class="p-10 bg-white/[0.03] border border-white/10 rounded-[48px] hover:bg-white/[0.06] hover:border-white/20 transition-all group">
						<div class="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center {feature.color} mb-8 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-black/50">
							<feature.icon class="w-8 h-8" />
						</div>
						<h3 class="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
						<p class="text-slate-400 text-lg leading-relaxed font-medium">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
