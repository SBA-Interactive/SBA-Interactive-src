<script lang="ts">
    const { 
        id,
        title,
        children,
        bgColor = 'slate-900',
        textColor = 'white'
    } = $props();
</script>

<article class="!-mx-6 md:!-mx-10 !my-32" aria-labelledby={id}>
    <div class="bg-gradient-to-br from-{bgColor} via-slate-800 to-{bgColor} dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-[3rem] p-8 md:p-20 relative overflow-hidden border border-white/5">
        <!-- Subtle gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5"></div>
        
        <div class="relative z-10 text-{textColor}">
            <header class="max-w-5xl mx-auto mb-20">
                <h2 {id} class="!mt-0 !mb-12 text-{textColor} text-5xl md:text-6xl lg:text-7xl text-center font-bold">
                    {title}
                </h2>
                {@render children()}
            </header>
        </div>
    </div>
</article>
