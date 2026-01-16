<script lang="ts">
	import IconCarbonLogoGithub from 'virtual:icons/carbon/logo-github';
	import IconCarbonMenu from 'virtual:icons/carbon/menu';
	import IconCarbonClose from 'virtual:icons/carbon/close';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import LanguagePicker from './LanguagePicker.svelte';
	import { i18n } from '../i18n/store.svelte.ts';

	let links = $derived([
		{ label: i18n.t('header.nav_wp'), href: '/sba-interactive/#wordpress' },
		{ label: i18n.t('header.nav_custom'), href: '/sba-interactive/#custom' },
		{ label: i18n.t('header.nav_advanced'), href: '/sba-interactive/#advanced' },
		{ label: i18n.t('header.nav_pricing'), href: '/sba-interactive/#pricing' },
		{ label: i18n.t('header.nav_contact'), href: '/sba-interactive/#contact' }
	]);

	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-surface-200/50 bg-surface-50/80 backdrop-blur-md dark:border-surface-800/50 dark:bg-surface-900/80 transition-colors duration-300">
	<div class="container mx-auto px-4 h-16 flex items-center justify-between">

		<a href="/sba-interactive/" class="flex items-center gap-2 text-xl font-bold tracking-tight">
			<span class="bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent">SBA</span>
			<span class="hidden sm:inline text-surface-900 dark:text-surface-100">Interactive</span>
		</a>


		<nav class="hidden md:flex items-center gap-8">
			{#each links as link}
				<a href={link.href} class="relative text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary-600 after:to-primary-400 after:transition-all after:duration-300 hover:after:w-full">
					{link.label}
				</a>
			{/each}
		</nav>


		<div class="flex items-center gap-3">
			<div class="hidden sm:flex items-center gap-3">
				<LanguagePicker />
				<ThemeSwitcher />
			</div>


			<button 
				onclick={toggleMobileMenu}
				class="md:hidden p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-lg transition-colors border border-surface-200 dark:border-surface-700 shadow-sm"
				aria-expanded={isMobileMenuOpen}
				aria-label="Toggle mobile menu"
			>
				{#if isMobileMenuOpen}
					<IconCarbonClose class="w-6 h-6 text-surface-700 dark:text-surface-300" />
				{:else}
					<IconCarbonMenu class="w-6 h-6 text-surface-700 dark:text-surface-300" />
				{/if}
			</button>
		</div>
	</div>


	{#if isMobileMenuOpen}
		<div class="md:hidden absolute top-full left-0 w-full bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-4 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
			<nav class="flex flex-col gap-4">
				{#each links as link}
					<a 
						href={link.href} 
						class="text-lg font-medium p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300"
						onclick={() => isMobileMenuOpen = false}
					>
						{link.label}
					</a>
				{/each}
				
				<hr class="border-surface-200 dark:border-surface-800" />
				
				<div class="flex items-center justify-between px-2 pt-2">
					<LanguagePicker />
					<ThemeSwitcher />
				</div>
			</nav>
		</div>
	{/if}
</header>