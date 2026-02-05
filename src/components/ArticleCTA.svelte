<script lang="ts">
    import { i18n } from '../i18n/store.svelte.ts';
    
    const { 
        primaryColor = 'primary',
        secondaryColor = 'secondary',
        title,
        description,
        showBrief = true,
        showContact = true,
        ctaText
    } = $props();

    const baseUrl = import.meta.env.BASE_URL;
</script>

<section class="text-center py-24 bg-gradient-to-br from-{primaryColor}-600/10 via-{secondaryColor}-500/5 to-transparent rounded-[3rem] px-8 border border-{primaryColor}-500/10">
    <h2 class="!mt-0 mx-auto text-5xl md:text-6xl">{title}</h2>
    <p class="max-w-3xl mx-auto mb-12 text-xl">{description}</p>
    
    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {#if showContact}
            <a 
                href={`${baseUrl}#contact`} 
                class="cta-btn bg-{primaryColor}-600 hover:bg-{primaryColor}-700 shadow-xl hover:shadow-{primaryColor}-500/40"
            >
                {ctaText || i18n.t('article_custom.cta')}
            </a>
        {/if}
        
        {#if showBrief}
            <a 
                href={`${baseUrl}brief`}
                class="cta-btn-outline border-2 border-{primaryColor}-500 text-{primaryColor}-600 dark:text-{primaryColor}-400 hover:bg-{primaryColor}-500/10 shadow-lg hover:shadow-{primaryColor}-500/20"
            >
                {i18n.t('brief.cta_button') || 'Fill Out Brief'}
            </a>
        {/if}
    </div>
</section>

<style>
@reference "../styles/global.css";

.cta-btn-outline {
    @apply inline-flex items-center justify-center px-14 py-7 font-bold rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer no-underline text-2xl active:scale-95 backdrop-blur-sm;
}
</style>
