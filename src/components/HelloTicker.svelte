<script lang="ts">
	const items = [
		{ word: "Hello", color: "text-rose-300 dark:text-rose-400", hover: "hover:text-rose-500 dark:hover:text-rose-200" },
		{ word: "Hola", color: "text-orange-300 dark:text-orange-400", hover: "hover:text-orange-500 dark:hover:text-orange-200" },
		{ word: "Bonjour", color: "text-sky-300 dark:text-sky-400", hover: "hover:text-sky-500 dark:hover:text-sky-200" },
		{ word: "Hallo", color: "text-emerald-300 dark:text-emerald-400", hover: "hover:text-emerald-500 dark:hover:text-emerald-200" },
		{ word: "Ciao", color: "text-red-300 dark:text-red-400", hover: "hover:text-red-500 dark:hover:text-red-200" },
		{ word: "Cześć", color: "text-violet-300 dark:text-violet-400", hover: "hover:text-violet-500 dark:hover:text-violet-200" },
		{ word: "Γεια σας", color: "text-cyan-300 dark:text-cyan-400", hover: "hover:text-cyan-500 dark:hover:text-cyan-200" },
		{ word: "你好", color: "text-indigo-300 dark:text-indigo-400", hover: "hover:text-indigo-500 dark:hover:text-indigo-200" },
		{ word: "你好", color: "text-fuchsia-300 dark:text-fuchsia-400", hover: "hover:text-fuchsia-500 dark:hover:text-fuchsia-200" }
	];
</script>

<section class="py-12 bg-white dark:bg-slate-950 overflow-hidden flex flex-col gap-8 border-y border-slate-100 dark:border-white/5 relative z-20">
	<div class="flex whitespace-nowrap">
		<div class="flex animate-scroll hover:pause gap-12 py-2">
			{#each [1, 2, 3, 4, 5, 6] as _}
				{#each items as item}
					<span class="text-4xl md:text-6xl font-black uppercase tracking-normal {item.color} {item.hover} transition-colors duration-300 cursor-default select-none">
						{item.word}
					</span>
				{/each}
			{/each}
		</div>
	</div>

	<div class="flex whitespace-nowrap">
		<div class="flex animate-scroll-reverse hover:pause gap-12 py-2">
			{#each [1, 2, 3, 4, 5, 6] as _}
				{#each items as item}
					<span 
						class="text-4xl md:text-6xl font-black uppercase tracking-normal {item.color} {item.hover} transition-colors duration-300 cursor-default select-none" 
						style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
					>
						{item.word}
					</span>
				{/each}
			{/each}
		</div>
	</div>
</section>

<style>
	.animate-scroll {
		display: flex;
		width: max-content;
		animation: scroll 60s linear infinite;
	}

	.animate-scroll-reverse {
		display: flex;
		width: max-content;
		animation: scroll-reverse 60s linear infinite;
	}

	.animate-scroll:hover,
	.animate-scroll-reverse:hover {
		animation-play-state: paused;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@keyframes scroll-reverse {
		0% {
			transform: translateX(-50%);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
