<script lang="ts">
    import { i18n } from '../i18n/store.svelte.ts';
    import articleImage from '../assets/images/articles/wordpress.png';
    import scalableImage from '../assets/images/articles/scalable.png';
    import ArticleContent from './ArticleContent.svelte';
    import ArticleSection from './ArticleSection.svelte';
    import ArticleDarkSection from './ArticleDarkSection.svelte';
    import ArticleSubheading from './ArticleSubheading.svelte';
    import ArticleList from './ArticleList.svelte';
    import ArticleGrid from './ArticleGrid.svelte';
    import ArticleCTA from './ArticleCTA.svelte';

    const baseUrl = import.meta.env.BASE_URL;
</script>

<ArticleContent 
    title={i18n.t('article_wordpress.title')} 
    date={i18n.t('article_wordpress.date')}
>
    <!-- Intro Section -->
    <section aria-labelledby="introduction-heading">
        <h2 id="introduction-heading" class="sr-only">Introduction</h2>
        <p>{i18n.t('article_wordpress.intro_1')}</p>  
        <p>{i18n.t('article_wordpress.intro_2')}</p>
    </section>

    <!-- Section 1: What is WordPress truly? -->
    <ArticleSection id="what-is-wordpress-heading" title={i18n.t('article_wordpress.section1_title')}>
        <p>{i18n.t('article_wordpress.section1_p1')}</p>
        <p>{i18n.t('article_wordpress.section1_p2')}</p>

        <figure>
            <img src={articleImage.src} alt="WordPress Architecture Diagram" class="w-full rounded-3xl my-12 shadow-2xl">
        </figure>

        <section aria-labelledby="why-wordpress-heading" class="mb-12">
            <h3 id="why-wordpress-heading" class="text-2xl font-bold mb-6">{i18n.t('article_wordpress.section1_h3')}</h3>
            <p>{i18n.t('article_wordpress.section1_list_intro')}</p>

            <ArticleList 
                items={[
                    i18n.t('article_wordpress.section1_li1'),
                    i18n.t('article_wordpress.section1_li2'),
                    i18n.t('article_wordpress.section1_li3')
                ]}
                bulletColor="primary"
                textSize="text-lg md:text-xl"
                glowIntensity="0.5"
            />
        </section>

        <section aria-labelledby="why-not-wordpress-heading">
            <h3 id="why-not-wordpress-heading" class="text-2xl font-bold mb-6">{i18n.t('article_wordpress.section1_h3_2')}</h3>
            <p>{i18n.t('article_wordpress.section1_p3')}</p>

            <ArticleList 
                items={[
                    i18n.t('article_wordpress.section1_li4'),
                    i18n.t('article_wordpress.section1_li5')
                ]}
                bulletColor="secondary"
                textSize="text-lg md:text-xl"
                glowIntensity="0.5"
            />
        </section>
    </ArticleSection>

    <!-- OUR SOLUTION: Dark Section -->
    <ArticleDarkSection id="our-solution-heading" title={i18n.t('article_wordpress.section2_title')}>
        <ArticleSubheading id="solution-tagline" title={i18n.t('article_wordpress.section2_h3')} />
        
        <p class="text-xl md:text-2xl text-center !text-primary-400 font-semibold !mb-10 max-w-3xl mx-auto">
            {i18n.t('article_wordpress.section2_p1')}
        </p>

        <p class="text-lg md:text-xl text-slate-300 text-center max-w-4xl mx-auto !mb-16 leading-relaxed">
            {i18n.t('article_wordpress.section2_p2')}
        </p>

        <!-- Main Paths List -->
        <section aria-labelledby="development-paths-heading" class="max-w-4xl mx-auto mb-20">
            <h3 id="development-paths-heading" class="sr-only">Development Paths</h3>
            <ArticleList 
                items={[
                    i18n.t('article_wordpress.section2_li1'),
                    i18n.t('article_wordpress.section2_li2')
                ]}
                bulletColor="primary"
                textSize="text-2xl md:text-3xl"
                glowIntensity="0.8"
            />
        </section>

        <div class="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto mt-20">
            <section aria-labelledby="for-who-heading">
                <h3 id="for-who-heading" class="!text-white text-2xl md:text-3xl !mb-6 font-bold">
                    {i18n.t('article_wordpress.section2_h3_2')}
                </h3>
                <p class="text-slate-300 text-lg leading-relaxed max-w-xl">
                    {i18n.t('article_wordpress.section2_p3')}
                </p>
            </section>

            <section aria-labelledby="best-for-heading">
                <h3 id="best-for-heading" class="!text-white text-2xl md:text-3xl !mb-8 font-bold">
                    {i18n.t('article_wordpress.section2_h3_3')}
                </h3>
                <ArticleList 
                    items={[
                        i18n.t('article_wordpress.section2_li3'),
                        i18n.t('article_wordpress.section2_li4'),
                        i18n.t('article_wordpress.section2_li5')
                    ]}
                    bulletColor="secondary"
                    textSize="text-lg"
                    glowIntensity="0.4"
                />
            </section>
        </div>
    </ArticleDarkSection>

    <!-- Scalability Section -->
    <ArticleSection id="scalability-heading" title={i18n.t('article_wordpress.section4_title')}>
        <p>{i18n.t('article_wordpress.section4_p1')}</p>
        <p>{i18n.t('article_wordpress.section4_p2')}</p>

        <figure>
            <img src={scalableImage.src} alt="Scalable Infrastructure Visualization" class="w-full rounded-3xl my-12 shadow-2xl">
        </figure>
    </ArticleSection>

    <!-- Guarantee Section -->
    <ArticleSection id="guarantee-heading" title={i18n.t('article_wordpress.section5_title')}>
        <p>{i18n.t('article_wordpress.section5_p1')}</p>

        <ArticleGrid 
            items={[
                i18n.t('article_wordpress.section5_li1'),
                i18n.t('article_wordpress.section5_li2'),
                i18n.t('article_wordpress.section5_li3'),
                i18n.t('article_wordpress.section5_li4')
            ]}
        />
    </ArticleSection>

    <!-- Call to Action -->
    <ArticleCTA 
        title={i18n.t('article_wordpress.section6_title')}
        description={i18n.t('article_wordpress.section6_p1')}
        primaryColor="primary"
        secondaryColor="secondary"
        showBrief={true}
        showContact={true}
        ctaText={i18n.t("article_wordpress.cta")}
    />
</ArticleContent>
