<script lang='ts'>
    const { title, date, children } = $props();
</script>

<div class="container">
    <div class="title-container glass-card mb-12 relative overflow-hidden group">
        <div class="absolute inset-0 pastel-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
        <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <h1 class="m-0 text-3xl md:text-5xl font-heading tracking-tight leading-tight drop-shadow-sm">{@html title}</h1>
            <div class="flex flex-col items-end">
                <span class="text-xs font-bold uppercase tracking-widest text-primary-500 mb-1 drop-shadow-[0_2px_4px_rgba(14,165,233,0.3)]">Published</span>
                <p class="text-slate-500 dark:text-slate-400 font-medium m-0"><date>{@html date}</date></p>
            </div>
        </div>
    </div>
    
    <div class="content relative pl-10 md:pl-16">
        <div class="absolute left-0 top-4 bottom-4 w-1.5 bg-gradient-to-b from-primary-400 via-secondary-400 to-primary-500/20 hidden md:block rounded-full shadow-[0_0_30px_rgba(14,165,233,0.8),0_0_60px_rgba(14,165,233,0.4)]"></div>
        {@render children()}
    </div>
</div>


<style>
@reference "../styles/global.css";

h1 {
    @apply bg-gradient-to-r from-slate-900 via-primary-600 to-slate-900 dark:from-white dark:via-primary-400 dark:to-white bg-clip-text text-transparent;
    text-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.title-container {
    @apply border-none rounded-[2.5rem] px-8 py-10 md:px-12 md:py-20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)];
}

.container {
    @apply w-full md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto px-6 py-20 md:py-32;
}

.content {
    @apply space-y-24 text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-[1.8];
}

:global(.content section) {
    @apply relative transition-all duration-500 hover:translate-x-2;
}

:global(.content h3) {
    @apply text-2xl md:text-3xl font-bold mb-6 mt-16 text-slate-800 dark:text-slate-100 tracking-tight;
    text-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

:global(.content p) {
    @apply mb-10;
}

:global(.content img) {
    @apply shadow-[0_60px_100px_-20px_rgba(0,0,0,0.4)] transition-all duration-700 hover:scale-[1.03] rounded-[3.5rem] border border-slate-200 dark:border-white/5;
}

:global(.cta-btn) {
    @apply inline-flex items-center justify-center px-14 py-7 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all duration-500 shadow-[0_25px_50px_-12px_rgba(2,132,199,0.5)] hover:shadow-[0_40px_80px_-15px_rgba(2,132,199,0.7)] hover:-translate-y-2 cursor-pointer no-underline mt-16 text-2xl active:scale-95;
}

:global(.content .glass-card) {
    @apply shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.25)] border-white/20;
}
</style>