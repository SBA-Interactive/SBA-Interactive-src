<script lang="ts">
  export let color: 'blue' | 'pink' | 'purple' | 'green' | 'orange' | 'cyan' | 'rose' = 'blue';
</script>

<div class="divider-section">
  <div class="glow-container">
    <div class="glow {color}"></div>
  </div>
  <div class="line-container">
    <div class="line {color}"></div>
  </div>
</div>

<style>
  .divider-section {
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: transparent;
    pointer-events: none;
  }

  .glow-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .glow {
    width: 600px;
    height: 60px;
    border-radius: 100%;
    filter: blur(80px);
    opacity: 0.2;
    background-color: var(--glow-bg);
    transition: all 0.8s ease;
  }

  .line-container {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .line {
    width: 45%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--line-color) 20%, 
      var(--line-color) 80%, 
      transparent
    );
    opacity: 0.15;
    position: relative;
    transition: all 0.5s ease;
  }

  .line::after {
    content: '';
    position: absolute;
    inset: -2px -20px;
    background: inherit;
    filter: blur(4px);
    opacity: 0.3;
  }

  /* Pastel Colors Mapping */
  .blue { 
    --glow-bg: var(--color-pastel-blue); 
    --line-color: var(--color-primary-400); 
  }
  .pink { 
    --glow-bg: var(--color-pastel-pink); 
    --line-color: #f472b6; 
  }
  .purple { 
    --glow-bg: var(--color-pastel-purple); 
    --line-color: #c084fc; 
  }
  .green { 
    --glow-bg: var(--color-pastel-green); 
    --line-color: #4ade80; 
  }
  .orange { 
    --glow-bg: var(--color-pastel-orange); 
    --line-color: #fb923c; 
  }
  .cyan { 
    --glow-bg: var(--color-pastel-cyan); 
    --line-color: #22d3ee; 
  }
  .rose { 
    --glow-bg: var(--color-pastel-rose); 
    --line-color: #fb7185; 
  }

  :global(.dark) .glow {
    opacity: 0.1;
    filter: blur(100px);
  }

  :global(.dark) .line {
    opacity: 0.1;
  }
  
  :global(.dark) .line::after {
    opacity: 0.2;
  }

  :global(.dark) .blue { --glow-bg: var(--color-pastel-blue-dark); }
  :global(.dark) .pink { --glow-bg: var(--color-pastel-pink-dark); }
  :global(.dark) .purple { --glow-bg: var(--color-pastel-purple-dark); }
  :global(.dark) .green { --glow-bg: var(--color-pastel-green-dark); }
  :global(.dark) .orange { --glow-bg: var(--color-pastel-orange-dark); }
  :global(.dark) .cyan { --glow-bg: var(--color-pastel-cyan-dark); }
  :global(.dark) .rose { --glow-bg: var(--color-pastel-rose-dark); }

  @media (max-width: 768px) {
    .divider-section {
      height: 100px;
    }
    .line {
      width: 65%;
    }
    .glow {
      width: 350px;
    }
  }
</style>
