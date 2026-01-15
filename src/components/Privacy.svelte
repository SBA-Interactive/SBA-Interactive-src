<script lang="ts">
	import { i18n } from '../i18n/store.svelte.ts';
</script>

<section class="section-padding">
	<div class="container mx-auto px-4 max-w-4xl">
		<h1 class="text-5xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white">{$i18n.t('privacy.title')}</h1>
		<p class="text-lg text-slate-600 dark:text-slate-400 mb-12">{$i18n.t('privacy.last_updated')}</p>

		<div class="prose prose-lg dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300">
			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('privacy.s1_title')}</h2>
				<p>{$i18n.t('privacy.s1_text')}</p>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('privacy.s2_title')}</h2>
				<p>{$i18n.t('privacy.s2_text')}</p>
				<ul class="list-disc pl-6 space-y-2 mt-4">
					<li>{$i18n.t('privacy.s2_li1')}</li>
					<li>{$i18n.t('privacy.s2_li2')}</li>
					<li>{$i18n.t('privacy.s2_li3')}</li>
					<li>{$i18n.t('privacy.s2_li4')}</li>
				</ul>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('privacy.s3_title')}</h2>
				<p>{$i18n.t('privacy.s3_text')}</p>
				<ul class="list-disc pl-6 space-y-2 mt-4">
					<li>{$i18n.t('privacy.s3_li1')}</li>
					<li>{$i18n.t('privacy.s3_li2')}</li>
					<li>{$i18n.t('privacy.s3_li3')}</li>
					<li>{$i18n.t('privacy.s3_li4')}</li>
				</ul>
			</section>

			<section>
				<h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('privacy.s4_title')}</h2>
				<p>{$i18n.t('privacy.s4_text')}</p>
			</section>

			<div class="mt-16 p-8 bg-slate-100 dark:bg-surface-800 rounded-3xl border border-slate-200 dark:border-surface-700">
				<h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">{$i18n.t('privacy.contact_title')}</h3>
				<p class="text-slate-600 dark:text-slate-400 mb-6">{$i18n.t('privacy.contact_text')}</p>
				<a href="mailto:privacy@sbainteractive.com" class="text-primary-600 font-bold hover:underline">privacy@sbainteractive.com</a>
			</div>
		</div>
	</div>
</section>
