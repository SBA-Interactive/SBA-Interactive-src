<script lang="ts">
	import { animate } from 'motion';
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
	import { i18n } from '../i18n/store.svelte.ts';
	import IconCarbonSend from 'virtual:icons/carbon/send';
	import IconCarbonCheckmark from 'virtual:icons/carbon/checkmark';
    import IconCarbonArrowRight from 'virtual:icons/carbon/arrow-right';
    import IconCarbonArrowLeft from 'virtual:icons/carbon/arrow-left';
    import IconCarbonHelp from 'virtual:icons/carbon/help';
  import { LETSSTARTUP_ENDPOINT } from '../formConfig.ts';

	let formElement = $state<HTMLFormElement>();
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

    // Stepper State
    let currentStep = $state(0);
    let direction = $state(1); // 1 = forward, -1 = backward
    let stepsVisited = $state(new Set([0]));

    const steps = [
        { id: 'overview', title: 'brief.section_overview', color: 'rose' },
        { id: 'audience', title: 'brief.section_audience', color: 'orange' },
        { id: 'brand', title: 'brief.section_brand', color: 'sky' },
        { id: 'goals', title: 'brief.section_goals', color: 'emerald' },
        { id: 'features', title: 'brief.section_features', color: 'violet' },
        { id: 'content', title: 'brief.section_content', color: 'cyan' },
        { id: 'technical', title: 'brief.section_technical', color: 'indigo' },
        { id: 'risks', title: 'brief.section_risks', color: 'fuchsia' },
        { id: 'future', title: 'brief.section_future', color: 'lime' },
        { id: 'final', title: 'brief.section_final', color: 'blue' }
    ];

    // Colors for dynamic styling
    const stepColors: Record<string, string> = {
        rose: 'border-rose-300 dark:border-rose-700 shadow-rose-500/10 text-rose-500',
        orange: 'border-orange-300 dark:border-orange-700 shadow-orange-500/10 text-orange-500',
        sky: 'border-sky-300 dark:border-sky-700 shadow-sky-500/10 text-sky-500',
        emerald: 'border-emerald-300 dark:border-emerald-700 shadow-emerald-500/10 text-emerald-500',
        violet: 'border-violet-300 dark:border-violet-700 shadow-violet-500/10 text-violet-500',
        cyan: 'border-cyan-300 dark:border-cyan-700 shadow-cyan-500/10 text-cyan-500',
        indigo: 'border-indigo-300 dark:border-indigo-700 shadow-indigo-500/10 text-indigo-500',
        fuchsia: 'border-fuchsia-300 dark:border-fuchsia-700 shadow-fuchsia-500/10 text-fuchsia-500',
        lime: 'border-lime-300 dark:border-lime-700 shadow-lime-500/10 text-lime-500',
        blue: 'border-blue-300 dark:border-blue-700 shadow-blue-500/10 text-blue-500'
    };
    
    // Gradient text classes
    const titleGradients: Record<string, string> = {
        rose: 'from-rose-400 to-red-600',
        orange: 'from-orange-400 to-amber-600',
        sky: 'from-sky-400 to-blue-600',
        emerald: 'from-emerald-400 to-teal-600',
        violet: 'from-violet-400 to-purple-600',
        cyan: 'from-cyan-400 to-sky-600',
        indigo: 'from-indigo-400 to-violet-600',
        fuchsia: 'from-fuchsia-400 to-pink-600',
        lime: 'from-lime-400 to-green-600',
        blue: 'from-blue-400 to-indigo-600'
    };

	// Form State
	let formData = $state({
		// Startup Overview
		startupName: '',
		oneSentenceDesc: '',
		problemSolved: '',
		mainOffer: '', 
		competitorDifference: '',

		// Target Audience
		primaryAudience: '',
		targetGroups: [] as string[],
		audienceAge: '',
		geoMarket: '',
		biggestPainPoint: '',

		// Brand & Style
		brandDescribe: '',
		brandPersonality: [] as string[],
		visualStyle: '',
		brandingAssets: '',
		likedBrands: '',

		// Website Goals
		primaryGoal: '',
		mainAction: '',
		conversionBrandingScale: 3,

		// Pages & Features
		pagesIncluded: [] as string[],
		specialFeatures: [] as string[],
		languageCount: '',

		// Content & Assets
		contentAvailability: '',
		helpNeeded: [] as string[],
		socialProof: [] as string[],
		highlightImportant: '',

		// Technical
		ownDomain: '',
		newOrRedesign: '',
		seoRequired: '',
		compliance: [] as string[],

		// Risks
		agencyExperience: '',
		mainConcern: [] as string[],
		concernOther: '',
		avoidNotes: '',

		// Future
		scaleExpectation: '',
		futureNeeds: [] as string[],

        // Contact
        additionalNotes: '',
        contactInfo: ''
	});

    // Check if a specific step is valid based on formData
    function isStepValid(index: number) {
        // Step 0: Overview
        if (index === 0) {
            return formData.startupName.trim() !== '' && 
                   formData.oneSentenceDesc.trim() !== '' && 
                   formData.problemSolved.trim() !== '' && 
                   formData.mainOffer !== '' && 
                   formData.competitorDifference.trim() !== '';
        }
        // Step 1: Audience
        if (index === 1) {
            return formData.primaryAudience !== '' && 
                   formData.targetGroups.length > 0 &&
                   formData.audienceAge !== '' &&
                   formData.geoMarket !== '' &&
                   formData.biggestPainPoint.trim() !== '';
        }
        // Step 2: Brand
        if (index === 2) {
            return formData.brandDescribe.trim() !== '' &&
                   formData.brandPersonality.length > 0 &&
                   formData.visualStyle !== '' &&
                   formData.brandingAssets !== '';
        }
        // Step 3: Goals
        if (index === 3) {
            return formData.primaryGoal !== '' && 
                   formData.mainAction !== '';
        }
        // Step 4: Features
        if (index === 4) {
             return formData.pagesIncluded.length > 0 &&
                    formData.specialFeatures.length > 0 &&
                    formData.languageCount !== '';
        }
        // Step 5: Content
        if (index === 5) {
            return formData.contentAvailability !== '' &&
                   formData.helpNeeded.length > 0 &&
                   formData.socialProof.length > 0;
        }
        // Step 6: Technical
        if (index === 6) {
            return formData.ownDomain !== '' &&
                   formData.newOrRedesign !== '' &&
                   formData.seoRequired !== '';
        }
        // Step 7: Risks
        if (index === 7) {
            return formData.agencyExperience !== '' &&
                   formData.mainConcern.length > 0;
        }
        // Step 8: Future
        if (index === 8) {
            return formData.scaleExpectation !== '' &&
                   formData.futureNeeds.length > 0;
        }
         // Step 9: Final
        if (index === 9) {
            return formData.contactInfo.trim() !== '';
        }

        return true;
    }

    function goToStep(index: number) {
        if (index < 0 || index >= steps.length) return;

        if (window.innerWidth < 1024 || (window.innerHeight > 900 && window.scrollY > 380)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        direction = index > currentStep ? 1 : -1;
        currentStep = index;

        const newVisited = new Set(stepsVisited);
        newVisited.add(index);
        stepsVisited = newVisited;
    }

    function nextStep() {
        goToStep(currentStep + 1);
    }

    function prevStep() {
        goToStep(currentStep - 1);
    }

    // Helper to toggle checkboxes
    function toggleCheckbox(group: string[], value: string) {
        if (group.includes(value)) {
            return group.filter(v => v !== value);
        } else {
            return [...group, value];
        }
    }

    // Specific toggles
    function toggleTargetGroup(val: string) { formData.targetGroups = toggleCheckbox(formData.targetGroups, val); }
    function toggleBrandPersonality(val: string) { 
        if (!formData.brandPersonality.includes(val) && formData.brandPersonality.length >= 3) return;
        formData.brandPersonality = toggleCheckbox(formData.brandPersonality, val); 
    }
    function togglePages(val: string) { formData.pagesIncluded = toggleCheckbox(formData.pagesIncluded, val); }
    function toggleSpecialFeatures(val: string) { formData.specialFeatures = toggleCheckbox(formData.specialFeatures, val); }
    function toggleHelpNeeded(val: string) { formData.helpNeeded = toggleCheckbox(formData.helpNeeded, val); }
    function toggleSocialProof(val: string) { formData.socialProof = toggleCheckbox(formData.socialProof, val); }
    function toggleCompliance(val: string) { formData.compliance = toggleCheckbox(formData.compliance, val); }
    function toggleMainConcern(val: string) { formData.mainConcern = toggleCheckbox(formData.mainConcern, val); }
    function toggleFutureNeeds(val: string) { formData.futureNeeds = toggleCheckbox(formData.futureNeeds, val); }


	async function handleSubmit(e: Event) {
		e.preventDefault();
        
        // Final validation before submit
        for (let i = 0; i < steps.length; i++) {
             if (!isStepValid(i)) {
                 goToStep(i);
                 submitError = $i18n.t('brief.error_validation').replace('{step}', (i+1).toString()).replace('{title}', $i18n.t(steps[i].title).replace('Section: ', ''));
                 return;
             }
        }

		isSubmitting = true;
		submitError = '';

		try {
			const response = await fetch(LETSSTARTUP_ENDPOINT + "?type=longassbrief", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitSuccess = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				submitError = $i18n.t('brief.error_generic');
			}
		} catch (err) {
			submitError = $i18n.t('brief.error_network');
		} finally {
			isSubmitting = false;
		}
	}

    function getStepIn(i: number) {
        const dist = 20; // Less move
        const dur = 300; // Faster
        const defaults = { opacity: 0, duration: dur, delay: 100, easing: quintOut };
        
        switch (i % 4) {
            case 0: return { ...defaults, x: -dist }; // From Left
            case 1: return { ...defaults, x: dist };  // From Right
            case 2: return { ...defaults, y: -dist }; // From Top
            case 3: return { ...defaults, y: dist };  // From Bottom
            default: return { ...defaults, x: -dist };
        }
    }

    function getStepOut(i: number) {
        return { duration: 200, opacity: 0, easing: quintOut }; // fast fade out
    }

    let isMobile = $state(false);

    $effect(() => {
        if (typeof window !== 'undefined') {
            const mq = window.matchMedia('(max-width: 1023px)');
            isMobile = mq.matches;
            const handler = (e: MediaQueryListEvent) => isMobile = e.matches;
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }
    });
</script>

<div class="brief-container max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8 relative mb-24">
    
    {#if submitSuccess}
        <div class="glass-card p-12 rounded-3xl text-center border-emerald-500/30 bg-emerald-500/5 w-full max-w-3xl mx-auto">
            <div class="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <IconCarbonCheckmark class="w-10 h-10 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">{$i18n.t('brief.success_title')}</h2>
            <p class="text-slate-600 dark:text-slate-400 text-lg">{$i18n.t('brief.success_message')}</p>
        </div>
    {:else}
        <!-- Sidebar Navigation (Desktop) -->
        <aside class="hidden lg:block w-72 shrink-0 sticky top-24 h-fit space-y-2">
            {#each steps as step, i}
                {@const valid = isStepValid(i)}
                {@const visited = stepsVisited.has(i)}
                {@const isActive = i === currentStep}
                {@const stepColor = stepColors[step.color]}
                <!-- Extract specific color classes for active state -->
                {@const activeBorder = isActive ? stepColor.split(' ')[0] : 'border-transparent'}
                {@const activeShadow = isActive ? stepColor.split(' ')[2] : ''}
                
                <button 
                    class="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ring-1 inset-0
                    {isActive 
                        ? `bg-white dark:bg-slate-800 shadow-lg ring-${step.color}-500/20` 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 ring-transparent text-slate-600 dark:text-slate-400'
                    }"
                    onclick={() => goToStep(i)}
                >
                    <!-- Active State Background Gradient & Indicator -->
                    {#if isActive}
                        <div class="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-{step.color}-400 to-{step.color}-600 rounded-r-full"></div>
                        <div class="absolute inset-0 bg-linear-to-r from-{step.color}-500/10 to-transparent pointer-events-none"></div>
                    {/if}

                    <div class="w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0 relative z-10 border
                        {valid ? 'rounded-full' : 'rounded-lg'}
                        {valid
                            ? `bg-linear-to-br from-${step.color}-300 to-${step.color}-500 text-white shadow-lg shadow-${step.color}-500/30 border-transparent`
                            : visited
                                ? `bg-linear-to-br from-${step.color}-900/80 to-${step.color}-950/80 text-${step.color}-300 border-${step.color}-500/50`
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                        }">
                        {i + 1}
                    </div>
                    
                    <div class="flex items-center gap-2 relative z-10">
                        <span class="text-sm font-medium {isActive ? 'text-slate-900 dark:text-white' : ''}">{ $i18n.t(step.title).replace('Section: ', '') }</span>
                        {#if valid}
                            <span class="text-lg leading-none font-bold text-slate-400 dark:text-white" title={$i18n.t('brief.tooltip_completed')}>*</span>
                        {:else if visited}
                            <span class="text-lg leading-none font-bold text-rose-500" title={$i18n.t('brief.tooltip_required')}>*</span>
                        {:else}
                            <span class="text-lg leading-none font-bold text-slate-300 dark:text-slate-600" title={$i18n.t('brief.tooltip_todo')}>*</span>
                        {/if}
                    </div>
                </button>
            {/each}
        </aside>

        <div class="grow max-w-3xl mx-auto w-full">
            <!-- Mobile Step Indicator -->
            <div class="lg:hidden mb-8">
                <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    <span>{$i18n.t('brief.step')} {currentStep + 1} / {steps.length}</span>
                    <span style="color: var(--step-color)" class="font-black">{$i18n.t(steps[currentStep].title)}</span>
                </div>
                <div class="flex gap-1.5 h-1.5 w-full">
                    {#each steps as step, i}
                        <button 
                            type="button"
                            class="h-full grow rounded-full transition-all duration-500 {i <= currentStep ? '' : 'bg-slate-200 dark:bg-surface-800'}"
                            style={i <= currentStep ? `background-color: var(--color-${step.color}-500, ${step.color}); box-shadow: 0 0 8px var(--color-${step.color}-500, ${step.color});` : ''}
                            onclick={() => goToStep(i)}
                            aria-label="{$i18n.t('brief.aria_go_to_step').replace('{step}', (i + 1).toString())}"
                        ></button>
                    {/each}
                </div>
            </div>

            <form onsubmit={handleSubmit} bind:this={formElement} class="grid grid-cols-1 grid-rows-1 perspective-1000">
                
                {#key currentStep}
                    <div 
                        class="col-start-1 row-start-1 w-full step-content"
                    >
                    <div 
                         in:fly={{ x: isMobile ? 0 : 50 * direction, y: isMobile ? 50 : 0, opacity: 0, duration: 400, delay: 150, easing: quintOut }}
                        out:fly={{ x: isMobile ? 0 : -50 * direction, y: isMobile ? -50 : 0, opacity: 0, duration: 300, easing: quintOut }}
                    >
                        <div class="glass-card p-6 md:p-10 rounded-3xl border-2 transition-all duration-500 {stepColors[steps[currentStep].color]}"
                        style="--step-color: var(--color-{steps[currentStep].color}-500, {steps[currentStep].color}); 
                               --step-color-dark: color-mix(in srgb, var(--color-{steps[currentStep].color}-500, {steps[currentStep].color}), black 25%);
                               --step-color-light: color-mix(in srgb, var(--color-{steps[currentStep].color}-500, {steps[currentStep].color}), white 70%);">
                        <div class="flex items-center gap-4 mb-8">
                            <span class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-br {titleGradients[steps[currentStep].color]} opacity-80">
                                {currentStep + 1}
                            </span>
                            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                {$i18n.t(steps[currentStep].title)}
                            </h2>
                        </div>
                        
                        <div class="space-y-8">
                            {#if currentStep === 0} <!-- Overview -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="startupName">{$i18n.t('brief.lbl_startup_name')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <input type="text" id="startupName" bind:value={formData.startupName} required class="form-input" placeholder={$i18n.t('brief.ph_answer')} />
                                </div>
                                <div class="group">
                                    <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="oneSentenceDesc">{$i18n.t('brief.lbl_description')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <input type="text" id="oneSentenceDesc" bind:value={formData.oneSentenceDesc} required class="form-input" placeholder={$i18n.t('brief.ph_answer')} />
                                </div>
                                <div class="group">
                                    <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="problemSolved">{$i18n.t('brief.lbl_problem')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <textarea id="problemSolved" bind:value={formData.problemSolved} required rows="3" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_offer')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid md:grid-cols-2 gap-3 pb-1">
                                         {#each ['product', 'service', 'product_service', 'platform'] as opt}
                                            <label class="radio-card cursor-pointer group">
                                                <input type="radio" name="offer_type" value={opt} bind:group={formData.mainOffer} class="sr-only">
                                                <span class="radio-content block p-4 text-center rounded-xl border-2 transition-all {formData.mainOffer === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="competitorDifference">{$i18n.t('brief.lbl_different')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <textarea id="competitorDifference" bind:value={formData.competitorDifference} required rows="3" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>

                            {:else if currentStep === 1} <!-- Audience -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_primary_audience')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="flex flex-wrap gap-3">
                                         {#each ['b2c', 'b2b', 'both'] as opt}
                                            <label class="radio-pill cursor-pointer">
                                                <input type="radio" name="primary_audience" value={opt} bind:group={formData.primaryAudience} class="sr-only">
                                                <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.primaryAudience === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_targeting')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid md:grid-cols-2 gap-3">
                                         {#each ['startups', 'small_business', 'enterprises', 'freelancers', 'consumers', 'developers'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.targetGroups.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="target_groups" class="sr-only" value={opt} bind:group={formData.targetGroups} />
                                                <span class="text-center">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="audienceAge">{$i18n.t('brief.lbl_age_range')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <select id="audienceAge" bind:value={formData.audienceAge} class="form-select w-full">
                                        <option value="">{$i18n.t('brief.opt_choose')}</option>
                                        <option value="younger">{$i18n.t('brief.opt_age_younger')}</option>
                                        <option value="gen-z">{$i18n.t('brief.opt_age_genz')}</option>
                                        <option value="mil">{$i18n.t('brief.opt_age_mil')}</option>
                                        <option value="gen-x">{$i18n.t('brief.opt_age_genx')}</option>
                                        <option value="boomers">{$i18n.t('brief.opt_age_boomers')}</option>
                                        <option value="all">{$i18n.t('brief.opt_age_all')}</option>
                                     </select>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_geo')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="flex flex-wrap gap-3">
                                        {#each ['local', 'national', 'international'] as opt}
                                            <label class="radio-pill cursor-pointer">
                                                <input type="radio" name="geo_market" value={opt} bind:group={formData.geoMarket} class="sr-only">
                                                <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.geoMarket === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="biggestPainPoint">{$i18n.t('brief.lbl_pain_point')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <textarea id="biggestPainPoint" bind:value={formData.biggestPainPoint} required rows="3" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>

                            {:else if currentStep === 2} <!-- Brand -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="brandDescribe">{$i18n.t('brief.lbl_brand_words')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <input type="text" id="brandDescribe" bind:value={formData.brandDescribe} list="brandAvailable" required class="form-input" placeholder={$i18n.t('brief.ph_brand_describe')} />
                                     <datalist id="brandAvailable">
                                        <option value="Minimal"></option>
                                        <option value="Luxury"></option>
                                        <option value="Playful"></option>
                                        <option value="Corporate"></option>
                                        <option value="Futuristic"></option>
                                        <option value="Eco-friendly"></option>
                                     </datalist>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_personality')} ({$i18n.t('brief.lbl_select_3')})</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                         {#each ['professional', 'friendly', 'bold', 'innovative', 'playful', 'trustworthy', 'premium', 'minimal'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-2 text-xs md:text-sm rounded-lg border-2 cursor-pointer transition-all {formData.brandPersonality.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="personality" class="sr-only" value={opt} bind:group={formData.brandPersonality} />
                                                <span class="text-center">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_visual_style')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid md:grid-cols-2 gap-3 pb-1">
                                        {#each ['clean_minimal', 'modern_tech', 'corporate', 'creative_artistic', 'fun_colorful'] as opt}
                                            <label class="radio-card cursor-pointer group">
                                                <input type="radio" name="visual_style" value={opt} bind:group={formData.visualStyle} class="sr-only">
                                                <span class="radio-content block p-4 text-center rounded-xl border-2 transition-all {formData.visualStyle === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_assets')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="flex flex-wrap gap-3">
                                         {#each ['yes_full', 'partial', 'no'] as opt}
                                            <label class="radio-pill cursor-pointer">
                                                <input type="radio" name="branding_assets" value={opt} bind:group={formData.brandingAssets} class="sr-only">
                                                <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.brandingAssets === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" for="likedBrands">{$i18n.t('brief.lbl_liked_brands')}</label>
                                     <textarea id="likedBrands" bind:value={formData.likedBrands} rows="2" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>

                            {:else if currentStep === 3} <!-- Goals -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_primary_goal')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid md:grid-cols-2 gap-3 pb-1">
                                         {#each ['generate_leads', 'sell_products', 'explain_product', 'build_credibility', 'attract_investors'] as opt}
                                            <label class="radio-card cursor-pointer group">
                                                <input type="radio" name="primary_goal" value={opt} bind:group={formData.primaryGoal} class="sr-only">
                                                <span class="radio-content block p-4 text-center rounded-xl border-2 transition-all {formData.primaryGoal === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_main_action')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="flex flex-wrap gap-3">
                                         {#each ['contact_us', 'sign_up', 'book_demo', 'purchase', 'download'] as opt}
                                            <label class="radio-pill cursor-pointer">
                                                <input type="radio" name="main_action" value={opt} bind:group={formData.mainAction} class="sr-only">
                                                <span class="px-4 py-2 rounded-full border-2 transition-all font-bold text-sm {formData.mainAction === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_conversion_vs_branding')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 max-w-2xl mx-auto md:mx-0 py-6">
                                        <span class="text-xs md:text-sm font-bold text-slate-500 uppercase order-1 md:order-1 text-center md:text-left opacity-70">{$i18n.t('brief.lbl_mostly_branding')}</span>
                                        <div class="flex gap-2 md:gap-4 order-2 md:order-2 items-center">
                                            {#each [1, 2, 3, 4, 5] as val}
                                                {@const isSelected = formData.conversionBrandingScale === val}
                                                <label class="cursor-pointer relative transition-all duration-500 {isSelected ? 'scale-110 z-10' : 'scale-80 opacity-40 hover:opacity-80'}">
                                                    <input type="radio" name="conversion_scale" value={val} bind:group={formData.conversionBrandingScale} class="sr-only">
                                                     <div class="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-black transition-all border-2 {isSelected ? 'border-transparent shadow-2xl' : 'border-slate-200 dark:border-surface-700 bg-slate-50 dark:bg-surface-800'}"
                                                          style={isSelected ? `background: linear-gradient(135deg, var(--step-color), var(--step-color-dark)) !important; color: white !important; box-shadow: 0 15px 30px -10px color-mix(in srgb, var(--step-color), transparent 30%);` : `color: var(--step-color);`}>
                                                        {val}
                                                    </div>
                                                </label>
                                            {/each}
                                        </div>
                                        <span class="text-xs md:text-sm font-bold text-slate-500 uppercase order-3 md:order-3 text-center md:text-right opacity-70">{$i18n.t('brief.lbl_mostly_conversion')}</span>
                                     </div>
                                </div>

                            {:else if currentStep === 4} <!-- Features -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_pages')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                         {#each ['home', 'about', 'product', 'services', 'pricing', 'blog', 'careers', 'contact'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-2 text-xs md:text-sm rounded-lg border-2 cursor-pointer transition-all {formData.pagesIncluded.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="pages_included" class="sr-only" value={opt} bind:group={formData.pagesIncluded} />
                                                <span class="text-center">{$i18n.t(`brief.opt_page_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_special_features')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid md:grid-cols-2 gap-3">
                                         {#each ['contact_forms', 'booking', 'user_accounts', 'payments', 'newsletter', 'cms', 'none'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.specialFeatures.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="spec_features" class="sr-only" value={opt} bind:group={formData.specialFeatures} />
                                                <span class="text-center">{$i18n.t(`brief.opt_feat_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300" for="languageCount">{$i18n.t('brief.lbl_languages')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <select id="languageCount" bind:value={formData.languageCount} class="form-select w-full md:w-1/2">
                                        <option value="">{$i18n.t('brief.opt_choose')}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3-5">3-5</option>
                                        <option value="5+">5+</option>
                                     </select>
                                </div>

                            {:else if currentStep === 5} <!-- Content -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_content_ready')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="flex flex-wrap gap-3">
                                        {#each ['all_ready', 'some_ready', 'no_content'] as opt}
                                            <label class="radio-pill cursor-pointer">
                                                <input type="radio" name="content_avail" value={opt} bind:group={formData.contentAvailability} class="sr-only">
                                                <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.contentAvailability === opt ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t(`brief.opt_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_need_help')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid grid-cols-2 gap-3">
                                         {#each ['copywriting', 'images', 'icons', 'video', 'none'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.helpNeeded.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="help_types" class="sr-only" value={opt} bind:group={formData.helpNeeded} />
                                                <span class="text-center">{$i18n.t(`brief.opt_help_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_social_proof')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="grid grid-cols-2 gap-3">
                                         {#each ['testimonials', 'case_studies', 'press', 'none'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.socialProof.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="proof_types" class="sr-only" value={opt} bind:group={formData.socialProof} />
                                                <span class="text-center">{$i18n.t(`brief.opt_proof_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>
                                <div class="group">
                                     <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" for="highlightImportant">{$i18n.t('brief.lbl_highlight')}</label>
                                     <textarea id="highlightImportant" bind:value={formData.highlightImportant} rows="2" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>

                            {:else if currentStep === 6} <!-- Technical -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_own_domain')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                      <div class="flex gap-4">
                                          <label class="radio-pill cursor-pointer"> 
                                            <input type="radio" name="has_domain" value="yes" bind:group={formData.ownDomain} class="sr-only"> 
                                            <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.ownDomain === 'yes' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.yes')}</span> 
                                          </label>
                                          <label class="radio-pill cursor-pointer"> 
                                            <input type="radio" name="has_domain" value="no" bind:group={formData.ownDomain} class="sr-only"> 
                                            <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.ownDomain === 'no' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.no')}</span> 
                                          </label>
                                      </div>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_new_redesign')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                      <div class="flex gap-4">
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="proj_type" value="new" bind:group={formData.newOrRedesign} class="sr-only"> <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.newOrRedesign === 'new' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.opt_new_site')}</span> </label>
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="proj_type" value="redesign" bind:group={formData.newOrRedesign} class="sr-only"> <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.newOrRedesign === 'redesign' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.opt_redesign')}</span> </label>
                                      </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span class="block text-sm font-bold text-slate-700 dark:text-slate-300">{$i18n.t('brief.lbl_seo')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                        <div class="group/tooltip relative">
                                            <IconCarbonHelp class="w-4 h-4 text-slate-400 cursor-help" />
                                             <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                                                 {$i18n.t('brief.tooltip_seo')}
                                             </div>
                                        </div>
                                     </div>
                                      <div class="flex gap-4">
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="seo_ready" value="yes" bind:group={formData.seoRequired} class="sr-only"> <span class="px-4 py-2 rounded-full border-2 transition-all font-bold text-sm {formData.seoRequired === 'yes' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.yes')}</span> </label>
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="seo_ready" value="no" bind:group={formData.seoRequired} class="sr-only"> <span class="px-4 py-2 rounded-full border-2 transition-all font-bold text-sm {formData.seoRequired === 'no' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.no')}</span> </label>
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="seo_ready" value="unsure" bind:group={formData.seoRequired} class="sr-only"> <span class="px-4 py-2 rounded-full border-2 transition-all font-bold text-sm {formData.seoRequired === 'unsure' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.unsure')}</span> </label>
                                      </div>
                                </div>
                                 <div class="group">
                                     <span class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{$i18n.t('brief.lbl_compliance')}</span>
                                      <div class="flex flex-wrap gap-3">
                                          {#each ['gdpr', 'wcag', 'industry', 'none'] as opt}
                                             <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.compliance.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                 <input type="checkbox" name="compliance_req" class="sr-only" value={opt} bind:group={formData.compliance} />
                                                 <span class="text-center">{$i18n.t(`brief.opt_comp_${opt}`)}</span>
                                             </label>
                                         {/each}
                                      </div>
                                </div>

                            {:else if currentStep === 7} <!-- Risks -->
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span style="color: var(--step-color)" class="block text-sm font-bold">{$i18n.t('brief.lbl_agency_exp')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <div class="space-y-2">
                                          <label class="radio-card cursor-pointer group"> 
                                             <input type="radio" name="exp_agency" value="yes_pos" bind:group={formData.agencyExperience} class="sr-only"> 
                                             <span class="radio-content block p-4 text-center rounded-xl border-2 transition-all {formData.agencyExperience === 'yes_pos' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">{$i18n.t('brief.opt_exp_pos')}</span> 
                                          </label>
                                          <label class="radio-card cursor-pointer group"> 
                                             <input type="radio" name="exp_agency" value="yes_neg" bind:group={formData.agencyExperience} class="sr-only"> 
                                             <span class="radio-content block p-4 text-center rounded-xl border-2 transition-all {formData.agencyExperience === 'yes_neg' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">{$i18n.t('brief.opt_exp_neg')}</span> 
                                          </label>
                                          <label class="radio-card cursor-pointer group"> 
                                             <input type="radio" name="exp_agency" value="no" bind:group={formData.agencyExperience} class="sr-only"> 
                                             <span class="radio-content block p-4 text-center rounded-xl border-2 transition-all {formData.agencyExperience === 'no' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">{$i18n.t('brief.opt_exp_no')}</span> 
                                          </label>
                                     </div>
                                </div>
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span style="color: var(--step-color)" class="block text-sm font-bold">{$i18n.t('brief.lbl_concerns')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                      <div class="grid md:grid-cols-2 gap-3 mb-3">
                                              {#each ['timeline', 'quality', 'complexity', 'communication'] as opt}
                                             <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.mainConcern.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                 <input type="checkbox" name="concerns" class="sr-only" value={opt} bind:group={formData.mainConcern} />
                                                 <span class="text-center">{$i18n.t(`brief.opt_concern_${opt}`)}</span>
                                             </label>
                                         {/each}
                                     </div>
                                     <input type="text" id="concernOther" bind:value={formData.concernOther} class="form-input mt-2" placeholder={$i18n.t('brief.lbl_other_concern')} />
                                </div>
                                <div class="group">
                                     <label style="color: var(--step-color)" class="block text-sm font-bold mb-2" for="avoidNotes">{$i18n.t('brief.lbl_avoid')}</label>
                                     <textarea id="avoidNotes" bind:value={formData.avoidNotes} rows="2" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>

                            {:else if currentStep === 8} <!-- Future -->
                                 <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <span style="color: var(--step-color)" class="block text-sm font-bold opacity-80">{$i18n.t('brief.lbl_scale')}</span>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                      <div class="flex gap-4">
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="scale_up" value="yes" bind:group={formData.scaleExpectation} class="sr-only"> <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.scaleExpectation === 'yes' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.yes')}</span> </label>
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="scale_up" value="maybe" bind:group={formData.scaleExpectation} class="sr-only"> <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.scaleExpectation === 'maybe' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.maybe')}</span> </label>
                                          <label class="radio-pill cursor-pointer"> <input type="radio" name="scale_up" value="no" bind:group={formData.scaleExpectation} class="sr-only"> <span class="px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm {formData.scaleExpectation === 'no' ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400 bg-white dark:bg-surface-800/30'}">{$i18n.t('brief.no')}</span> </label>
                                      </div>
                                </div>
                                <div class="group">
                                     <span style="color: var(--step-color)" class="block text-sm font-bold opacity-80 mb-2">{$i18n.t('brief.lbl_future_needs')}</span>
                                     <div class="grid md:grid-cols-2 gap-3">
                                         {#each ['marketing', 'features', 'rebranding', 'maintenance', 'analytics'] as opt}
                                            <label class="checkbox-card flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all {formData.futureNeeds.includes(opt) ? 'selected-themed selected-themed-shadow' : 'border-slate-200 dark:border-surface-700/50 text-slate-600 dark:text-slate-400'}">
                                                <input type="checkbox" name="fut_needs" class="sr-only" value={opt} bind:group={formData.futureNeeds} />
                                                <span class="text-center">{$i18n.t(`brief.opt_fut_${opt}`)}</span>
                                            </label>
                                        {/each}
                                     </div>
                                </div>

                            {:else if currentStep === 9} <!-- Final -->
                                <div class="group">
                                     <span style="color: var(--step-color)" class="block text-sm font-bold opacity-80 mb-2">{$i18n.t('brief.lbl_additional')}</span>
                                     <textarea id="additionalNotes" bind:value={formData.additionalNotes} rows="4" class="form-textarea" placeholder={$i18n.t('brief.ph_answer')}></textarea>
                                </div>
                                <div class="group">
                                     <div class="mb-2 flex items-center gap-2">
                                        <label style="color: var(--step-color)" class="block text-sm font-bold opacity-80" for="contactInfo">{$i18n.t('brief.lbl_contact_info')}</label>
                                        <span class="text-rose-500 text-xl leading-none" title={$i18n.t('brief.tooltip_required')}>*</span>
                                     </div>
                                     <p class="text-xs text-slate-500 mb-2">{$i18n.t('brief.contact_hint')}</p>
                                     <input type="text" id="contactInfo" bind:value={formData.contactInfo} required class="form-input" placeholder={$i18n.t('brief.ph_contact')} />
                                </div>
                            {/if}
                        </div>
                        
                        {#if submitError}
                            <div class="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
                                {submitError}
                            </div>
                        {/if}
                        
                        <!-- Navigation Buttons inside card -->
                        <div class="flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-white/5">
                            <button
                                type="button"
                                onclick={prevStep}
                                class="px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-700 transition-colors flex items-center gap-2 disabled:opacity-0"
                                disabled={currentStep === 0}
                            >
                                <IconCarbonArrowLeft />
                                <span>{$i18n.t('Back')}</span>
                            </button>
                            
                            {#if currentStep === steps.length - 1}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    class="px-8 py-3 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold no-underline"
                                    style="background: linear-gradient(135deg, var(--step-color), var(--step-color-dark)); box-shadow: 0 10px 25px -5px color-mix(in srgb, var(--step-color), transparent 50%);"
                                >
                                    {#if isSubmitting}
                                        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    {:else}
                                        <span>{$i18n.t('brief.btn_submit')}</span>
                                        <IconCarbonSend />
                                    {/if}
                                </button>
                            {:else}
                                <button
                                    type="button"
                                    onclick={nextStep}
                                    class="px-8 py-3 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold no-underline"
                                    style="background: linear-gradient(135deg, var(--step-color), var(--step-color-dark)); box-shadow: 0 10px 25px -5px color-mix(in srgb, var(--step-color), transparent 50%);"
                                >
                                    <span>{$i18n.t('Next')}</span>
                                    <IconCarbonArrowRight />
                                </button>
                            {/if}
                        </div>

                    </div>
                    </div>
                    </div>
                {/key}
           
            </form>
        </div>
    {/if}
</div>
