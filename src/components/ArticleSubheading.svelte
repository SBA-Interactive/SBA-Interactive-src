<script lang="ts">
    const { 
        id,
        title,
        textColor = 'slate-800 dark:text-slate-100'
    } = $props();
</script>

<h3 {id} class="text-2xl md:text-3xl !text-{textColor} !mb-8 text-center font-bold leading-snug max-w-4xl mx-auto">
    {title}
</h3>
