<script lang="ts">
	import { i18n } from '../i18n/store.svelte.ts';
</script>

<section class="section-padding">
	<div class="container mx-auto px-4 max-w-4xl">
		<h1 class="text-5xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white">{$i18n.t('terms.title')}</h1>
		<p class="text-lg text-slate-600 dark:text-slate-400 mb-12">{$i18n.t('terms.last_updated')}</p>

		<div class="prose prose-lg dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300">
			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('terms.s1_title')}</h2>
				<p>{$i18n.t('terms.s1_text')}</p>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('terms.s2_title')}</h2>
				<p>{$i18n.t('terms.s2_text')}</p>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('terms.s3_title')}</h2>
				<p>{$i18n.t('terms.s3_text')}</p>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('terms.s4_title')}</h2>
				<p>{$i18n.t('terms.s4_text')}</p>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('terms.s5_title')}</h2>
				<p>{$i18n.t('terms.s5_text')}</p>
			</section>

			<div class="mt-16 p-8 bg-slate-100 dark:bg-surface-800 rounded-3xl border border-slate-200 dark:border-surface-700">
				<h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('terms.contact_title')}</h3>
				<p class="text-slate-600 dark:text-slate-400 mb-6">{$i18n.t('terms.contact_text')}</p>
				<a href="mailto:legal@sbainteractive.com" class="text-primary-600 font-bold hover:underline">legal@sbainteractive.com</a>
			</div>
		</div>
	</div>
</section>
