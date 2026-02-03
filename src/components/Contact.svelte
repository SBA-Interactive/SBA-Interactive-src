<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';
	import IconCarbonSend from 'virtual:icons/carbon/send';
	import IconCarbonUser from 'virtual:icons/carbon/user';
	import IconCarbonEmail from 'virtual:icons/carbon/email';
	import IconCarbonTextLongParagraph from 'virtual:icons/carbon/text-long-paragraph';
	import IconCarbonPhone from 'virtual:icons/carbon/phone';
	import IconCarbonLocation from 'virtual:icons/carbon/location';
	import IconCarbonArrowRight from 'virtual:icons/carbon/arrow-right';
	import IconCarbonWarning from 'virtual:icons/carbon/warning';
	import IconCarbonDocument from 'virtual:icons/carbon/document';
	import { i18n } from '../i18n/store.svelte.ts';

	const base = import.meta.env.BASE_URL;

	let section: HTMLElement;
	let mainCard: HTMLElement;

	// Form state
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	const FORM_ACTION_URL = 'https://sbaint.letsstartup.eu/contact?type=quick'; // Replace with actual URL

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitError = '';

		try {
			const response = await fetch(FORM_ACTION_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ name, email, message })
			});

			if (response.ok) {
				submitSuccess = true;
				name = '';
				email = '';
				message = '';
			} else {
				submitError = 'Something went wrong. Please try again.';
			}
		} catch (err) {
			submitError = 'Network error. Please check your connection.';
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		if (mainCard) {
			inView(mainCard, () => {
				animate(mainCard, 
					{ y: [40, 0], opacity: [0, 1], scale: [0.97, 1] }, 
					{ duration: 0.9, easing: "ease-out" }
				);
			}, { margin: "0px 0px -10% 0px" });
		}
	});
</script>

<section id="contact" bind:this={section} class="min-h-screen relative overflow-hidden py-20 md:py-32 transition-colors duration-500">
	
	<!-- Subtle Background -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-linear-to-b from-slate-100/80 via-slate-50 to-white dark:from-surface-900 dark:via-surface-950 dark:to-surface-950"></div>
		<div class="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-slate-200/50 to-transparent dark:from-surface-800/30"></div>
		<div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#0ea5e908,transparent_50%)]"></div>
		<div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#6366f108,transparent_50%)]"></div>
		<div class="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-500/3 rounded-full blur-[100px]"></div>
		<div class="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-secondary-500/3 rounded-full blur-[80px]"></div>
	</div>

	<div class="container mx-auto px-4">
		
		<!-- Header -->
		<div class="text-center mb-12 md:mb-16">
			<div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-primary-500/20 dark:border-primary-500/30 backdrop-blur-md">
				<span class="relative flex h-2 w-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
				</span>
				{$i18n.t('quick_contact.pill')}
			</div>
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
				<span class="text-slate-900 dark:text-white">{$i18n.t('quick_contact.title_1')}</span><br/>
				<span class="bg-linear-to-r from-primary-500 via-secondary-500 to-primary-600 bg-clip-text text-transparent italic">{$i18n.t('quick_contact.title_2')}</span>
			</h1>
			<p class="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
				{$i18n.t('quick_contact.subtitle')}
			</p>
		</div>

		<!-- Main Card - Side by Side Layout -->
		<div bind:this={mainCard} class="max-w-6xl mx-auto opacity-0">
			<div class="glass-card rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/60 dark:border-white/5 shadow-2xl shadow-black/5 dark:shadow-black/20">
				<div class="grid lg:grid-cols-[1fr_1.2fr]">
					
					<!-- LEFT SIDE: Direct Contact Info -->
					<div class="p-8 md:p-12 lg:p-14 bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 text-white flex flex-col justify-center relative overflow-hidden">
						<!-- Decorative overlay -->
						<div class="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 to-transparent pointer-events-none"></div>
						<div class="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
						
						<div class="relative z-10">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
								<span class="text-primary-100 font-black uppercase tracking-[0.3em] text-xs">{$i18n.t('quick_contact.brief_pill')}</span>
							</div>
							
							<h2 class="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight tracking-tight">
								{$i18n.t('quick_contact.brief_title')}
							</h2>
							<p class="text-primary-100/80 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
								{$i18n.t('quick_contact.brief_description')}
							</p>

							<!-- Contact Info Cards -->
							<div class="space-y-4">
								<a href="mailto:contact@sbainteractive.com" class="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all group">
									<div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
										<IconCarbonEmail class="w-6 h-6" />
									</div>
									<div class="flex-1 min-w-0">
										<div class="text-xs font-bold text-primary-100/70 uppercase tracking-wider mb-1">{$i18n.t('contact.email_label')}</div>
										<div class="font-bold truncate">contact@sbainteractive.com</div>
									</div>
									<IconCarbonArrowRight class="w-5 h-5 text-primary-200 group-hover:translate-x-1 transition-transform" />
								</a>
<!-- 
								<a href="tel:+48213742067" class="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all group">
									<div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
										<IconCarbonPhone class="w-6 h-6" />
									</div>
									<div class="flex-1 min-w-0">
										<div class="text-xs font-bold text-primary-100/70 uppercase tracking-wider mb-1">{$i18n.t('contact.call_label')}</div>
										<div class="font-bold">+48 213 742 067</div>
									</div>
									<IconCarbonArrowRight class="w-5 h-5 text-primary-200 group-hover:translate-x-1 transition-transform" />
								</a> -->

								<div class="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
									<div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
										<IconCarbonLocation class="w-6 h-6" />
									</div>
									<div class="flex-1 min-w-0">
										<div class="text-xs font-bold text-primary-100/70 uppercase tracking-wider mb-1">{$i18n.t('contact.office_label')}</div>
										<div class="font-bold">{$i18n.t('contact.office_val')}</div>
									</div>
								</div>
							</div>

							<!-- Response Time Badge
							<div class="mt-8 flex items-center gap-4">
								<div class="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
									<span class="text-2xl">⚡</span>
								</div>
								<div>
									<div class="text-2xl font-black">24</div>
									<div class="text-xs font-bold text-primary-100/70 uppercase tracking-wider">{$i18n.t('quick_contact.response_time')}</div>
								</div>
							</div> -->
						</div>
					</div>

					<!-- RIGHT SIDE: Contact Form -->
					<div class="p-8 md:p-12 lg:p-14 bg-white dark:bg-surface-900 flex flex-col justify-center">
						
						{#if submitSuccess}
							<div class="text-center py-8">
								<div class="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
									<svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
								</div>
								<h3 class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">{$i18n.t('quick_contact.success_title')}</h3>
								<p class="text-slate-500 dark:text-slate-400 text-lg">{$i18n.t('quick_contact.success_message')}</p>
							</div>
						{:else}
							<form onsubmit={handleSubmit} class="space-y-5">
								
								<!-- Name Field -->
								<div class="group">
									<label for="contact-name" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
										{$i18n.t('quick_contact.name_label')}
									</label>
									<div class="relative">
										<div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
											<IconCarbonUser class="w-5 h-5" />
										</div>
										<input 
											type="text" 
											id="contact-name"
											bind:value={name}
											required
											placeholder={$i18n.t('quick_contact.name_placeholder')}
											class="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-surface-800/50 border-2 border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-0 outline-none transition-all font-medium"
										/>
									</div>
								</div>

								<!-- Email Field -->
								<div class="group">
									<label for="contact-email" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
										{$i18n.t('quick_contact.email_label')}
									</label>
									<div class="relative">
										<div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
											<IconCarbonEmail class="w-5 h-5" />
										</div>
										<input 
											type="email" 
											id="contact-email"
											bind:value={email}
											required
											placeholder={$i18n.t('quick_contact.email_placeholder')}
											class="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-surface-800/50 border-2 border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-0 outline-none transition-all font-medium"
										/>
									</div>
								</div>

								<!-- Message Field -->
								<div class="group">
									<label for="contact-message" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
										{$i18n.t('quick_contact.message_label')}
									</label>
									<div class="relative">
										<div class="absolute left-4 top-5 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
											<IconCarbonTextLongParagraph class="w-5 h-5" />
										</div>
										<textarea 
											id="contact-message"
											bind:value={message}
											required
											rows="4"
											placeholder={$i18n.t('quick_contact.message_placeholder')}
											class="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-surface-800/50 border-2 border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-0 outline-none transition-all font-medium resize-none"
										></textarea>
									</div>
								</div>

								{#if submitError}
									<div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
										{submitError}
									</div>
								{/if}

								<!-- Submit Button -->
								<button 
									type="submit" 
									disabled={isSubmitting}
									class="group w-full py-5 bg-linear-to-r from-slate-900 to-slate-700 dark:from-primary-600 dark:to-primary-500 text-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/30 dark:shadow-primary-600/30 overflow-hidden relative disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
								>
									<div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
									<span class="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-slate-900 dark:group-hover:text-primary-600 transition-colors">
										{#if isSubmitting}
											<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
												<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
												<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
										{:else}
											<IconCarbonSend class="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
										{/if}
									</span>
									<span class="font-black text-lg tracking-tight relative z-10">
										{isSubmitting ? $i18n.t('quick_contact.sending') : $i18n.t('quick_contact.submit')}
									</span>
								</button>

								<div class="flex items-center gap-4 pt-2">
									<div class="flex-1 h-px bg-linear-to-r from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
									<div class="px-4 py-2 rounded-full bg-slate-100 dark:bg-surface-800 border border-slate-200 dark:border-white/10">
										<span class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">{$i18n.t('quick_contact.or')}</span>
									</div>
									<div class="flex-1 h-px bg-linear-to-l from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
								</div>

								<a 
									href={`${base}/brief`} 
									class="group flex items-start gap-4 p-3 rounded-2xl bg-amber-100 dark:bg-amber-400/20 border-2 border-amber-300 dark:border-amber-500/30 hover:border-amber-400 dark:hover:border-amber-500/50 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all"
								>
									<div class="w-10 h-10 rounded-xl bg-amber-400 dark:bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
										<IconCarbonWarning class="w-6 h-6 text-red-800" />
									</div>
									<div class="flex-1 min-w-0">
										<div class="underline decoration-2 decoration-solid decoration-amber-700 text-xl font-black text-amber-900 dark:text-amber-300 text-center uppercase tracking-wider mb-1">
											{$i18n.t('quick_contact.brief_warning_label')}
										</div>
										<div class="text-amber-700 dark:text-amber-200/80 font-medium text-md leading-relaxed">
											{$i18n.t('quick_contact.brief_warning_text')}
										</div>
									</div>
									<div class="flex items-center gap-2 shrink-0 self-center">
										<IconCarbonDocument class="w-5 h-5 text-amber-700 dark:text-amber-400" />
										<IconCarbonArrowRight class="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform" />
									</div>
								</a>

							</form>
						{/if}
					</div>

				</div>
			</div>
		</div>

	</div>
</section>
