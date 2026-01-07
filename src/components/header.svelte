<script lang="ts">
	import IconCarbonLogoGithub from 'virtual:icons/carbon/logo-github';
	import IconCarbonMenu from 'virtual:icons/carbon/menu';
	import IconCarbonClose from 'virtual:icons/carbon/close';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import LanguagePicker from './LanguagePicker.svelte';

	const links = [
		{ label: 'WordPress', href: '#wordpress' },
		{ label: 'Custom Web', href: '#custom' },
		{ label: 'Advanced', href: '#advanced' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'Contact', href: '#contact' }
	];

	let isMobileMenuOpen = $state(false);
	let currentLang = $state('en');

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-surface-200/50 bg-surface-50/80 backdrop-blur-md dark:border-surface-800/50 dark:bg-surface-900/80 transition-colors duration-300">
	<div class="container mx-auto px-4 h-16 flex items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2 text-xl font-bold tracking-tight">
			<span class="bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent">SBA</span>
			<span class="hidden sm:inline text-surface-900 dark:text-surface-100">Interactive</span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden md:flex items-center gap-8">
			{#each links as link}
				<a href={link.href} class="text-sm font-medium text-surface-700 dark:text-surface-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Actions -->
		<div class="flex items-center gap-3">
			<div class="hidden sm:flex items-center gap-3">
				<LanguagePicker bind:currentLang />
				<ThemeSwitcher />
			</div>

			<!-- GitHub Link -->
			<a 
				href="https://github.com" 
				target="_blank" 
				class="p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors border border-surface-200 dark:border-surface-700 shadow-sm"
				aria-label="GitHub"
			>
				<IconCarbonLogoGithub class="w-5 h-5 text-surface-700 dark:text-surface-300" />
			</a>

			<!-- Mobile Menu Button -->
			<button 
				onclick={toggleMobileMenu}
				class="md:hidden p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-lg transition-colors border border-surface-200 dark:border-surface-700 shadow-sm"
			>
				{#if isMobileMenuOpen}
					<IconCarbonClose class="w-6 h-6 text-surface-700 dark:text-surface-300" />
				{:else}
					<IconCarbonMenu class="w-6 h-6 text-surface-700 dark:text-surface-300" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Navigation Overlay -->
	{#if isMobileMenuOpen}
		<div class="md:hidden absolute top-full left-0 w-full bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-4 shadow-xl">
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
				
				<div class="flex items-center justify-between px-2">
					<LanguagePicker bind:currentLang />
					<ThemeSwitcher />
				</div>
			</nav>
		</div>
	{/if}
</header>