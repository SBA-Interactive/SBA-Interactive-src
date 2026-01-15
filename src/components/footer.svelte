<script lang="ts">
	import IconCarbonLogoGithub from 'virtual:icons/carbon/logo-github';
	import IconCarbonLogoLinkedin from 'virtual:icons/carbon/logo-linkedin';
	import IconCarbonLogoTwitter from 'virtual:icons/carbon/logo-twitter';
	import { i18n } from '../i18n/store.svelte.ts';

	const currentYear = new Date().getFullYear();

	const footerLinks = $derived([
		{
			title: i18n.t('footer.col_services'),
			links: [
				{ label: i18n.t('header.nav_wp'), href: '/#wordpress' },
				{ label: i18n.t('header.nav_custom'), href: '/#custom' },
				{ label: i18n.t('header.nav_advanced'), href: '/#advanced' }
			]
		},
		{
			title: i18n.t('footer.col_company'),
			links: [
				{ label: i18n.t('footer.link_about'), href: '/#services' },
				{ label: i18n.t('header.nav_pricing'), href: '/#pricing' },
				{ label: i18n.t('header.nav_contact'), href: '/#contact' }
			]
		},
		{
			title: i18n.t('footer.col_legal'),
			links: [
				{ label: i18n.t('footer.link_privacy'), href: '/privacy' },
				{ label: i18n.t('footer.link_terms'), href: '/terms' }
			]
		}
	]);
</script>

<footer class="w-full border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 transition-colors duration-300 py-12">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

			<div class="col-span-2 lg:col-span-2">
				<a href="/" class="flex items-center gap-2 text-2xl font-bold tracking-tight mb-4">
					<span class="bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent">SBA</span>
					<span class="text-surface-900 dark:text-surface-100">Interactive</span>
				</a>
				<p class="text-surface-600 dark:text-surface-400 max-w-sm">
					{$i18n.t('footer.desc')}
				</p>
			</div>


			{#each footerLinks as section}
				<div class="flex flex-col gap-4">
					<h3 class="font-bold text-surface-900 dark:text-surface-100">{section.title}</h3>
					<nav class="flex flex-col gap-2">
						{#each section.links as link}
							<a href={link.href} class="text-surface-700 dark:text-surface-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
								{link.label}
							</a>
						{/each}
					</nav>
				</div>
			{/each}
		</div>

		<hr class="border-surface-200 dark:border-surface-800 mb-8" />

		<div class="flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-surface-500 dark:text-surface-400">
				{$i18n.t('footer.copyright').replace('{year}', currentYear.toString())}
			</p>
			
			<div class="flex items-center gap-4">
				<a href="https://github.com" target="_blank" class="p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors text-surface-700 dark:text-surface-400" aria-label="Github">
					<IconCarbonLogoGithub class="w-5 h-5" />
				</a>
				<a href="https://linkedin.com" target="_blank" class="p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors text-surface-700 dark:text-surface-400" aria-label="LinkedIn">
					<IconCarbonLogoLinkedin class="w-5 h-5" />
				</a>
				<a href="https://twitter.com" target="_blank" class="p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors text-surface-700 dark:text-surface-400" aria-label="Twitter">
					<IconCarbonLogoTwitter class="w-5 h-5" />
				</a>
			</div>
		</div>
	</div>
</footer>
