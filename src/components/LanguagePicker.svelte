<script lang="ts">
	import IconCarbonLanguage from 'virtual:icons/carbon/language';
	import { i18n } from '../i18n/store';

	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'es', label: 'Español' },
		{ code: 'fr', label: 'Français' },
		{ code: 'de', label: 'Deutsch' },
		{ code: 'it', label: 'Italiano' },
		{ code: 'pl', label: 'Polski' },
		{ code: 'gr', label: 'Greek' }
	];

	let isOpen = $state(false);
</script>

<div class="relative group">
	<button 
		onclick={() => isOpen = !isOpen}
		class="p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors flex items-center gap-1 border border-surface-200 dark:border-surface-700 shadow-sm"
	>
		<IconCarbonLanguage class="w-5 h-5 text-blue-500" />
		<span class="text-xs uppercase font-bold text-surface-700 dark:text-surface-300">{$i18n.lang}</span>
	</button>
	
	<div class="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
		<div class="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
			{#each languages as lang}
				<button 
					class="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-surface-700 transition-colors {$i18n.lang === lang.code ? 'text-blue-600 font-bold' : ''}"
					onclick={() => { i18n.setLang(lang.code as 'en' | 'pl' | 'de' | 'es' | 'fr' | 'it' | 'gr'); isOpen = false; }}
				>
					{lang.label}
				</button>
			{/each}
		</div>
	</div>
</div>
