<script lang="ts">
    import { onMount } from 'svelte';
    import { cms } from '../utils/cms.svelte';
    
    // Import all section components
    import Hero from './hero.svelte';
    import HelloTicker from './HelloTicker.svelte';
    import Features from './Features.svelte';
    import Services from './Services.svelte';
    import PortfolioShowcase from './PortfolioShowcase.svelte';
    import GraphicsSection from './GraphicsSection.svelte';
    import Pricing from './Pricing.svelte';
    import Support from './Support.svelte';
    import Contact from './Contact.svelte';
    import SectionDivider from './SectionDivider.svelte';

    interface Props {
        initialSections: any[];
        slug: string;
    }

    let { initialSections, slug }: Props = $props();

    // Start with initial sections from Astro (build time)
    let currentSections = $state(initialSections);

    onMount(async () => {
        await cms.fetchPage(slug);
        if (cms.data && cms.data.sections) {
            currentSections = cms.data.sections;
        }
    });
</script>

{#each currentSections as section}
    {#if section.enabled !== false}
        {#if section.type === 'hero'}
            <Hero 
                pill={section.pill}
                title_1={section.title_1}
                title_2={section.title_2}
                subtitle={section.subtitle}
                btn_start={section.btn_start}
                btn_explore={section.btn_explore}
            />
        {:else if section.type === 'ticker'}
            <HelloTicker />
        {:else if section.type === 'features'}
            <Features 
                pill={section.pill}
                title_1={section.title_1}
                title_2={section.title_2}
                title_3={section.title_3}
                subtitle={section.subtitle}
            />
        {:else if section.type === 'services'}
            <Services 
                pill={section.pill}
                title_1={section.title_1}
                title_2={section.title_2}
                subtitle={section.subtitle}
            />
        {:else if section.type === 'portfolio'}
            <PortfolioShowcase />
        {:else if section.type === 'graphics'}
            <GraphicsSection />
        {:else if section.type === 'pricing'}
            <Pricing />
        {:else if section.type === 'support'}
            <Support />
        {:else if section.type === 'contact'}
            <Contact />
        {:else if section.type === 'divider'}
            <SectionDivider color={section.color} bgClass={section.bgClass} />
        {/if}
    {/if}
{/each}
