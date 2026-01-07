<script lang="ts">
	import { onMount } from 'svelte';
	import IconCarbonSun from 'virtual:icons/carbon/sun';
	import IconCarbonMoon from 'virtual:icons/carbon/moon';

	let isDark = $state(false);

	function toggleTheme() {
		isDark = !isDark;
		applyTheme(isDark);
	}

	function applyTheme(dark: boolean) {
		if (dark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			isDark = savedTheme === 'dark';
		} else {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		applyTheme(isDark);
	});
</script>

<button 
	onclick={toggleTheme}
	class="p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-sm border border-surface-200 dark:border-surface-700"
	aria-label="Toggle Theme"
>
	{#if isDark}
		<IconCarbonSun class="w-5 h-5 text-amber-400" />
	{:else}
		<IconCarbonMoon class="w-5 h-5 text-blue-600" />
	{/if}
</button>
