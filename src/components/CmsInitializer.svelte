<script lang="ts">
    import { onMount } from 'svelte';
    import { cms } from '../utils/cms.svelte';

    onMount(async () => {
        await cms.fetchSettings();
    });
</script>

<!-- This component just initializes the CMS data fetching -->
