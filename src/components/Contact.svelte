<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import IconCarbonSend from 'virtual:icons/carbon/send';
	import { i18n } from '../i18n/store';

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
		<div bind:this={card} class="glass-card rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl shadow-black/10">
			<div class="grid lg:grid-cols-2">
				<!-- Content -->
				<div class="p-10 md:p-24 bg-primary-600 text-white flex flex-col justify-center relative overflow-hidden">
					<!-- Abstract background glow -->
					<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
					
					<div class="relative z-10">
						<div class="text-primary-100 font-black uppercase tracking-[0.4em] text-xs mb-8">{$i18n.t('contact.pill')}</div>
						<h2 class="text-4xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter text-white">{$i18n.t('contact.title_1')} <br/> {$i18n.t('contact.title_2')} <br/> <span class="underline decoration-white/30 italic">{$i18n.t('contact.title_3')}</span>.</h2>
						<p class="text-primary-100 text-lg md:text-xl mb-12 max-w-sm leading-relaxed font-medium">
							{$i18n.t('contact.subtitle')}
						</p>
						
						<div class="space-y-8">
							<div class="flex items-center gap-6">
								<div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-white/10 flex items-center justify-center text-xl md:text-2xl backdrop-blur-md shrink-0" aria-hidden="true">📍</div>
								<div>
									<div class="font-black text-base md:text-lg">{$i18n.t('contact.office_label')}</div>
									<div class="text-primary-100/70 font-medium text-sm md:text-base">{$i18n.t('contact.office_val')}</div>
								</div>
							</div>
							<div class="flex items-center gap-6">
								<div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-white/10 flex items-center justify-center text-xl md:text-2xl backdrop-blur-md shrink-0" aria-hidden="true">✉️</div>
								<div>
									<div class="font-black text-base md:text-lg">{$i18n.t('contact.email_label')}</div>
									<div class="text-primary-100/70 font-medium text-sm md:text-base">hello@sbainteractive.com</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Direct Contact Actions (Formerly Form) -->
				<div class="p-10 md:p-24 bg-white dark:bg-surface-900 flex flex-col justify-center">
					<div class="space-y-12">
						<div>
							<h3 class="text-3xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">{$i18n.t('contact.convo_title')}</h3>
							<p class="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-md">
								{$i18n.t('contact.convo_subtitle')}
							</p>
						</div>

						<a 
							href="mailto:contact@sbainteractive.com" 
							class="group w-full py-6 md:py-8 bg-slate-900 dark:bg-primary-600 text-white rounded-[24px] md:rounded-[32px] hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col md:flex-row items-center justify-center gap-4 shadow-2xl shadow-slate-900/20 dark:shadow-primary-600/30 overflow-hidden relative"
						>
							<div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
							<span class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-slate-900 dark:group-hover:text-primary-600 transition-colors">
								<IconCarbonSend class="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
							</span>
							<span class="font-black text-lg md:text-2xl tracking-tight relative z-10">contact@sbainteractive.com</span>
						</a>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div class="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 dark:bg-surface-800/50 border border-slate-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-2 h-2 rounded-full bg-blue-500"></div>
									<div class="text-xs font-black text-slate-400 group-hover:text-blue-500 uppercase tracking-widest transition-colors">{$i18n.t('contact.support_label')}</div>
								</div>
								<div class="text-lg font-bold text-slate-900 dark:text-white break-all">help@sbainteractive.com</div>
							</div>
							<div class="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 dark:bg-surface-800/50 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
									<div class="text-xs font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest transition-colors">{$i18n.t('contact.call_label')}</div>
								</div>
								<div class="text-lg font-bold text-slate-900 dark:text-white">+1 (555) 123-4567</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
