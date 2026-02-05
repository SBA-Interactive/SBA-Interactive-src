<script lang="ts">
    const { 
        items,
        columns = 'md:grid-cols-2'
    } = $props();
</script>

<div class="grid {columns} gap-6 mt-8" role="list">
    {#each items as item, i}
        <div class="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5 group" role="listitem">
            <span class="text-primary-500 font-bold mb-2 block text-2xl group-hover:scale-110 transition-transform duration-300">
                {(i + 1).toString().padStart(2, '0')}
            </span>
            <p class="m-0 text-base leading-relaxed">{item}</p>
        </div>
    {/each}
</div>
