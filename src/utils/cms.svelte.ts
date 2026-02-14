export const cms = $state({
    data: {} as any,
    settings: {} as any,
    navigation: {} as any,
    loading: true,
    error: null as string | null,

    async fetchPage(slug: string) {
        try {
            const response = await fetch(`/admin/api.php?action=get_entry&collection=pages&slug=${slug}`);
            if (!response.ok) throw new Error('Failed to fetch page data');
            const result = await response.json();
            if (result.error) throw new Error(result.error);
            this.data = result;
        } catch (e: any) {
            console.error('CMS Page Error:', e);
        }
    },

    async fetchSettings() {
        try {
            const [setRes, navRes] = await Promise.all([
                fetch(`/admin/api.php?action=get_entry&collection=settings&slug=settings`),
                fetch(`/admin/api.php?action=get_entry&collection=settings&slug=navigation`)
            ]);
            
            if (setRes.ok) {
                const result = await setRes.json();
                if (!result.error) this.settings = result;
            }
            
            if (navRes.ok) {
                const result = await navRes.json();
                if (!result.error) this.navigation = result;
            }
        } catch (e: any) {
            console.error('CMS Settings Error:', e);
        } finally {
            this.loading = false;
        }
    }
});
