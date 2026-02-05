<script lang="ts">
    const { 
        items,
        bulletColor = 'primary',
        textSize = 'text-2xl md:text-3xl',
        glowIntensity = '0.7'
    } = $props();
</script>

<ul class="space-y-6 list-none p-0" role="list">
    {#each items as item}
        <li class="flex items-center gap-5 text-white {textSize} font-semibold">
            <div class="w-4 h-4 rounded-full bg-{bulletColor}-400 shrink-0 shadow-[0_0_25px_rgba(14,165,233,{glowIntensity})]"></div>
            <span>{item}</span>
        </li>
    {/each}
</ul>
