<script lang="ts">
    const { 
        id,
        title,
        children 
    } = $props();
</script>

<article aria-labelledby={id}>
    <h2 {id} class="text-4xl md:text-5xl lg:text-6xl font-heading mb-10 mt-24 first:mt-0 bg-linear-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block leading-tight drop-shadow-2xl">
        {title}
    </h2>
    {@render children()}
</article>
