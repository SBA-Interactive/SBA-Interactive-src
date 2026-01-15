<script lang="ts">
	const hellos = [
		"Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Cześć", "Γεια σας", "你好", "你好"
	];
</script>

<section class="py-12 bg-white dark:bg-slate-950 overflow-hidden flex flex-col gap-8 border-y border-slate-100 dark:border-white/5 relative z-20">
	<div class="flex whitespace-nowrap">
		<div class="flex animate-scroll hover:pause gap-12 py-2">
			{#each [1, 2, 3, 4, 5, 6] as _}
				{#each hellos as hello}
					<span class="text-4xl md:text-6xl font-black uppercase tracking-normal text-slate-200 dark:text-white/10 hover:text-primary-500/40 transition-colors duration-500 cursor-default select-none">
						{hello}
					</span>
				{/each}
			{/each}
		</div>
	</div>

	<div class="flex whitespace-nowrap">
		<div class="flex animate-scroll-reverse hover:pause gap-12 py-2">
			{#each [1, 2, 3, 4, 5, 6] as _}
				{#each hellos as hello}
					<span class="text-4xl md:text-6xl font-black uppercase tracking-normal text-slate-100 dark:text-white/[0.05] select-none hover:text-indigo-500/40 transition-colors duration-500 cursor-default" style="-webkit-text-stroke: 1.5px rgba(128, 128, 128, 0.3);">
						{hello}
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
