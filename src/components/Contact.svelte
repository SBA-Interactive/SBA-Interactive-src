<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonSend from 'virtual:icons/carbon/send';

	let section: HTMLElement;
	let card: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(card, {
			scrollTrigger: {
				trigger: section,
				start: "top 80%",
				toggleActions: "play none none reverse"
			},
			y: 100,
			opacity: 0,
			scale: 0.95,
			duration: 1.2,
			ease: "power4.out"
		});
	});
</script>

<section id="contact" bind:this={section} class="section-padding bg-slate-50 dark:bg-surface-950 transition-colors duration-500">
	<div class="container mx-auto px-4">
		<div bind:this={card} class="glass-card rounded-[64px] overflow-hidden shadow-2xl shadow-black/10">
			<div class="grid lg:grid-cols-2">
				<!-- Content -->
				<div class="p-16 md:p-24 bg-primary-600 text-white flex flex-col justify-center relative overflow-hidden">
					<!-- Abstract background glow -->
					<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
					
					<div class="relative z-10">
						<div class="text-primary-100 font-black uppercase tracking-[0.4em] text-xs mb-8">Contact Us</div>
						<h2 class="text-5xl md:text-7xl font-black mb-10 leading-[0.85] tracking-tighter text-white">Let's build <br/> something <br/> <span class="underline decoration-white/30 italic">legendary</span>.</h2>
						<p class="text-primary-100 text-xl mb-16 max-w-sm leading-relaxed font-medium">
							Ready to crush your digital goals? We're ready when you are.
						</p>
						
						<div class="space-y-10">
							<div class="flex items-center gap-6">
								<div class="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center text-2xl backdrop-blur-md">📍</div>
								<div>
									<div class="font-black text-lg">Our Office</div>
									<div class="text-primary-100/70 font-medium">123 Digital Ave, Tech City</div>
								</div>
							</div>
							<div class="flex items-center gap-6">
								<div class="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center text-2xl backdrop-blur-md">✉️</div>
								<div>
									<div class="font-black text-lg">Email Us</div>
									<div class="text-primary-100/70 font-medium">hello@sbainteractive.com</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Form -->
				<div class="p-16 md:p-24 bg-white dark:bg-surface-900">
					<form class="space-y-8">
						<div class="grid md:grid-cols-2 gap-8">
							<div class="space-y-3">
								<label for="name" class="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Name</label>
								<input type="text" id="name" placeholder="John Doe" class="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-surface-800 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-surface-700 outline-none transition-all placeholder:text-slate-400 font-bold" />
							</div>
							<div class="space-y-3">
								<label for="email" class="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Email</label>
								<input type="email" id="email" placeholder="john@example.com" class="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-surface-800 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-surface-700 outline-none transition-all placeholder:text-slate-400 font-bold" />
							</div>
						</div>
						
						<div class="space-y-3">
							<label for="subject" class="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Service Interested In</label>
							<div class="relative">
								<select id="subject" class="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-surface-800 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-surface-700 outline-none transition-all appearance-none font-bold">
									<option>WordPress Development</option>
									<option>Custom Web Application</option>
									<option>UI/UX Design</option>
									<option>Other Service</option>
								</select>
								<div class="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
							</div>
						</div>

						<div class="space-y-3">
							<label for="message" class="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Message</label>
							<textarea id="message" rows="5" placeholder="Tell us about your project..." class="w-full px-8 py-6 rounded-[32px] bg-slate-50 dark:bg-surface-800 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-surface-700 outline-none transition-all placeholder:text-slate-400 resize-none font-bold leading-relaxed"></textarea>
						</div>

						<button type="submit" class="w-full py-6 bg-slate-900 dark:bg-primary-600 text-white font-black text-xl rounded-[32px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-xl shadow-black/10 dark:shadow-primary-600/20">
							Send Message
							<IconCarbonSend class="w-6 h-6" />
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
