import en from './en.json';
import pl from './pl.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import gr from './gr.json';

// Define the shape of our translations based on the English file
type TranslationSchema = typeof en;

const translationsMap: Record<string, TranslationSchema> = {
    en, pl, de, es, fr, it, gr
};

// Function to get nested property safely
function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj) || path;
}

// Global state for language
let currentLang = 'en';
const listeners = new Set<(lang: string) => void>();

export const i18n = {
    // Getter for current language
    get lang() {
        return currentLang;
    },
    
    // Setter for language, notifies listeners
    setLang(lang: 'en' | 'pl' | 'de' | 'es' | 'fr' | 'it' | 'gr') {
        currentLang = lang;
        listeners.forEach(cb => cb(lang));
        // Persist to localStorage if possible
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('sba_lang', lang);
        }
    },

    // Translation function
    t(key: string): string {
        const translations = translationsMap[currentLang] || en;
        return getNestedValue(translations, key);
    },

    // Svelte store contract for auto-subscription
    subscribe(fn: (value: { lang: string, t: (key: string) => string }) => void) {
        const update = () => fn({ lang: currentLang, t: i18n.t });
        listeners.add(update);
        update();
        return () => listeners.delete(update);
    }
};

// Initialize from localStorage if available
if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('sba_lang');
    if (saved && saved in translationsMap) {
        currentLang = saved;
    }
}
