<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonSettings from 'virtual:icons/carbon/settings';
	import IconCarbonCode from 'virtual:icons/carbon/code';
	import IconCarbonDevelopment from 'virtual:icons/carbon/development';

	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let heroButtons: HTMLElement;
	let heroCards: HTMLElement;
	let scrollIndicator: HTMLElement;
	let section: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// 1. Snappy Entrance (Plays immediately on load, independent of scroll)
		const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
		
		tl.from(heroTitle, { y: 30, opacity: 0, delay: 0.1 })
		  .from(heroSubtitle, { y: 20, opacity: 0 }, '-=0.6')
		  .from(heroButtons, { y: 20, opacity: 0 }, '-=0.6')
		  .from(heroCards.children, { 
			scale: 0.98, 
			opacity: 0, 
			y: 15,
			stagger: 0.08 
		  }, '-=0.5');

		// 2. Snappy Exit (Trigger-based, NOT scrubbed)
		// This plays once when you scroll past 10% of the section
		gsap.to([heroTitle, heroSubtitle, heroButtons, heroCards.children], {
			scrollTrigger: {
				trigger: section,
				start: "20% top",
				toggleActions: "play none none reverse",
			},
			y: -40,
			opacity: 0,
			duration: 0.4,
			stagger: 0.02,
			ease: "power2.in"
		});

		// 3. Background Blobs - Keep them static or very subtle
		gsap.to(".bg-blob", {
			y: 50,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut"
		});

		// 4. Scroll indicator fade out early
		gsap.to(scrollIndicator, {
			scrollTrigger: {
				trigger: section,
				start: "5% top",
				toggleActions: "play none none reverse"
			},
			opacity: 0,
			duration: 0.3
		});
	});
</script>

<section bind:this={section} class="relative min-h-[90vh] flex items-center overflow-hidden py-24 lg:py-32 bg-white dark:bg-surface-950 transition-colors duration-500">
	<!-- Fixed Background Decoration - Prevents "Black Shit" -->
	<div class="absolute inset-0 -z-10 bg-white dark:bg-surface-950">
		<div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#0ea5e915,transparent_50%)]"></div>
		<div class="bg-blob absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]"></div>
		<div class="bg-blob absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary-500/10 rounded-full blur-[150px]" style="animation-delay: 2s;"></div>
	</div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="grid lg:grid-cols-12 gap-16 items-center">
			<!-- Text Content -->
			<div class="lg:col-span-7 flex flex-col gap-10">
				<div bind:this={heroTitle}>
					<div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-black mb-6 border border-primary-200 dark:border-primary-800 shadow-sm">
						<span class="relative flex h-2.5 w-2.5">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
						</span>
						Premium Digital Architecture
					</div>
					<h1 class="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter text-slate-950 dark:text-white">
						We build <br/>
						<span class="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent italic">better</span> <br/>
						Websites.
					</h1>
				</div>
				
				<p bind:this={heroSubtitle} class="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 max-w-2xl leading-tight font-medium">
					High-performance <span class="text-primary-600 font-bold">WordPress</span> & <span class="text-indigo-600 font-bold">Custom React</span> engineering.
				</p>

				<div bind:this={heroButtons} class="flex flex-wrap gap-6 items-center">
					<a 
						href="#pricing" 
						class="px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white font-black text-xl rounded-[24px] shadow-xl shadow-primary-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 group"
					>
						Explore Plans
						<span class="group-hover:translate-x-1 transition-transform">→</span>
					</a>
					<a 
						href="#contact" 
						class="px-10 py-5 border-4 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black text-xl rounded-[24px] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all hover:-translate-y-1"
					>
						Get Started
					</a>
				</div>
			</div>

			<!-- Visual Content: Service Cards -->
			<div class="lg:col-span-5 grid gap-6" bind:this={heroCards}>
				<div class="glass-card p-8 rounded-[40px] flex items-center gap-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-2xl shadow-black/5">
					<div class="w-16 h-16 rounded-[24px] bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
						<IconCarbonSettings class="w-8 h-8" />
					</div>
					<div>
						<h3 class="text-xl font-black mb-1">WP Mastery</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Custom themes built for speed.</p>
					</div>
				</div>

				<div class="glass-card p-8 rounded-[40px] flex items-center gap-6 translate-x-8 hover:translate-x-10 transition-all duration-300 cursor-pointer group shadow-2xl shadow-black/5">
					<div class="w-16 h-16 rounded-[24px] bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
						<IconCarbonCode class="w-8 h-8" />
					</div>
					<div>
						<h3 class="text-xl font-black mb-1">React Power</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Complex apps, zero lag.</p>
					</div>
				</div>

				<div class="glass-card p-8 rounded-[40px] flex items-center gap-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-2xl shadow-black/5">
					<div class="w-16 h-16 rounded-[24px] bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0">
						<IconCarbonDevelopment class="w-8 h-8" />
					</div>
					<div>
						<h3 class="text-xl font-black mb-1">Digital SaaS</h3>
						<p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Scalable cloud platforms.</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Professional Scroll Indicator -->
	<button 
		bind:this={scrollIndicator}
		class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-1 transition-opacity duration-300 cursor-pointer group" 
		onclick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
		aria-label="Scroll to content"
	>
		<span class="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 group-hover:text-primary-500 transition-colors">Scroll</span>
		<div class="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full relative group-hover:border-primary-500/50 transition-colors">
			<div class="w-1 h-2 bg-primary-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
		</div>
	</button>
</section>
