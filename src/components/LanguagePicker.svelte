<script lang="ts">
	import IconCarbonLanguage from 'virtual:icons/carbon/language';
	import { i18n } from '../i18n/store.svelte.ts';

	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'es', label: 'Español' },
		{ code: 'fr', label: 'Français' },
		{ code: 'de', label: 'Deutsch' },
		{ code: 'it', label: 'Italiano' },
		{ code: 'pl', label: 'Polski' },
		{ code: 'gr', label: 'Greek' },
		{ code: 'zh', label: '简体中文 (国语)' },
		{ code: 'yue', label: '简体中文 (粤语)' }
	];

	let isOpen = $state(false);
</script>

<div class="relative group">
	<button 
		onclick={() => isOpen = !isOpen}
		class="p-3 md:p-2 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors flex items-center gap-2 border border-surface-200 dark:border-surface-700 shadow-sm"
	>
		<IconCarbonLanguage class="w-6 h-6 md:w-5 md:h-5 text-primary-500" />
		<span class="text-sm md:text-xs uppercase font-bold text-surface-700 dark:text-surface-300">{$i18n.lang}</span>
	</button>
	
	<div 
		class="absolute left-0 md:left-auto md:right-0 bottom-full md:bottom-auto md:top-full mb-2 md:mb-0 md:pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
		class:!opacity-100={isOpen}
		class:!visible={isOpen}
	>
		<div class="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-2xl overflow-hidden min-w-[240px] md:min-w-[160px] max-h-[60vh] md:max-h-none overflow-y-auto">
			{#each languages as lang}
				<button 
					class="w-full text-left px-6 py-4 md:px-4 md:py-2 text-lg md:text-sm hover:bg-primary-50 dark:hover:bg-surface-700 transition-colors {$i18n.lang === lang.code ? 'text-primary-600 font-bold bg-primary-50/50 dark:bg-surface-700/50' : 'text-surface-700 dark:text-surface-300'}"
					onclick={() => { i18n.setLang(lang.code as any); isOpen = false; }}
				>
					{lang.label}
				</button>
			{/each}
		</div>
	</div>
</div>
