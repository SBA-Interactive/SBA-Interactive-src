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
	
	{#if isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div 
			class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity"
			onclick={() => isOpen = false}
		></div>
	{/if}

	<div 
		class="
			z-[70] transition-all duration-300
			/* Mobile: Centered Modal */
			fixed top-[50dvh] left-[50vw] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[320px] 
			/* Desktop: Absolute Dropdown */
			md:absolute md:top-full md:left-auto md:right-0 md:bottom-auto md:translate-x-0 md:translate-y-0 md:w-auto md:mt-2 md:inset-auto
			/* Visibility Logic */
			{isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 md:group-hover:opacity-100 md:group-hover:visible md:group-hover:scale-100'}
		"
	>
		<div class="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-2xl overflow-hidden min-w-[240px] md:min-w-[160px] max-h-[70vh] md:max-h-none overflow-y-auto">
			<div class="p-4 border-b border-surface-100 dark:border-surface-700 md:hidden flex justify-between items-center">
				<span class="font-bold text-lg text-surface-900 dark:text-white">Select Language</span>
				<button onclick={() => isOpen = false} class="p-2 text-surface-500 underline text-sm italic">X</button>
			</div>
			<div class="grid grid-cols-1 divide-y divide-surface-100 dark:divide-surface-700 md:divide-none">
				{#each languages as lang}
					<button 
						class="w-full text-left px-6 py-4 md:px-4 md:py-2 text-lg md:text-sm hover:bg-primary-50 dark:hover:bg-surface-700 transition-colors flex items-center justify-between {$i18n.lang === lang.code ? 'text-primary-600 font-bold bg-primary-50/50 dark:bg-surface-700/50' : 'text-surface-700 dark:text-surface-300'}"
						onclick={() => { i18n.setLang(lang.code as any); isOpen = false; }}
					>
						<span>{lang.label}</span>
						{#if $i18n.lang === lang.code}
							<div class="w-2 h-2 rounded-full bg-primary-600"></div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
