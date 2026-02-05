<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { i18n } from '../i18n/store.svelte.ts';

    let showBanner = $state(false);

    onMount(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Check if GTM initialized already, though layout script should handle default
            showBanner = true;
        }
    });

    function updateGtmConsent(prefs: { analytics: boolean; marketing: boolean }) {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                'ad_storage': prefs.marketing ? 'granted' : 'denied',
                'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                'ad_personalization': prefs.marketing ? 'granted' : 'denied'
            });
            (window as any).dataLayer?.push({ 
                event: 'consent_updated',
                consent_prefs: prefs 
            });
        }
    }

    function acceptAll() {
        const consent = { analytics: true, marketing: true };
        localStorage.setItem('cookie-consent', JSON.stringify(consent));
        updateGtmConsent(consent);
        showBanner = false;
    }

    function declineAll() {
        const consent = { analytics: false, marketing: false };
        localStorage.setItem('cookie-consent', JSON.stringify(consent));
        updateGtmConsent(consent);
        showBanner = false;
    }
</script>

{#if showBanner}
    <div 
        transition:fade={{ duration: 400 }}
        class="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-8 flex justify-center pointer-events-none"
    >
        <div class="w-full max-w-6xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[48px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] p-8 md:p-12 pointer-events-auto relative overflow-hidden group">
            <!-- Decorative gradient -->
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-700"></div>
            
            <div class="flex flex-col lg:flex-row items-center gap-10 relative z-10">
                <div class="flex-1 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-widest mb-6">
                        <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        Privacy Portal
                    </div>
                    <h3 class="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">
                        {i18n.t('cookies.title')}
                    </h3>
                    <p class="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
                        {i18n.t('cookies.description')}
                    </p>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
                    <button 
                        onclick={declineAll}
                        class="px-8 py-5 rounded-[24px] border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-base md:text-lg whitespace-nowrap active:scale-95"
                    >
                        {i18n.t('cookies.decline')}
                    </button>
                    <button 
                        onclick={acceptAll}
                        class="px-12 py-5 rounded-[24px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/10 text-base md:text-lg whitespace-nowrap"
                    >
                        {i18n.t('cookies.accept')}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Small shadow adjustment for light mode to pop on white bgs */
    :global(html:not(.dark)) .group {
        box-shadow: 0 40px 100px -20px rgba(0,0,0,0.15);
    }
</style>
