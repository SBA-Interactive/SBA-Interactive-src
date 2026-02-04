import en from './en.json';
import pl from './pl.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import gr from './gr.json';
import zh from './zh.json';
import yue from './yue.json';
import ja from './ja.json';
import uk from './uk.json';
import tr from './tr.json';

type TranslationSchema = typeof en;
const translationsMap: Record<string, TranslationSchema> = { en, pl, de, es, fr, it, gr, zh, yue, ja, uk, tr };

function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj) || path;
}

// 1. Keep the state reactive
let currentLang = $state('en');
const listeners = new Set<(lang: string) => void>();

export const i18n = {
    get lang() { return currentLang; },
    
    setLang(lang: keyof typeof translationsMap) {
        currentLang = lang;
        listeners.forEach(cb => cb(lang));

        if (typeof document !== 'undefined') { document.documentElement.lang = lang; }
        if (typeof localStorage !== 'undefined') { localStorage.setItem('sba_lang', lang); }
    },

    t(key: string): string {
        // Accessing currentLang here is reactive
        const translations = translationsMap[currentLang] || en;
        const value = getNestedValue(translations, key);
        
        if (!value || value === key) {
            const fallbackValue = getNestedValue(en, key);
            if (fallbackValue && fallbackValue !== key) { return fallbackValue; }
        }
        
        return value;
    },

    subscribe(fn: (value: { lang: string, t: (key: string) => string }) => void) {
        const update = () => fn({ 
            get lang() { return currentLang; }, 
            t: (key: string) => i18n.t(key) 
        });
        
        listeners.add(update);
        update();
        return () => listeners.delete(update);
    }
};

if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('sba_lang');
    if (saved && saved in translationsMap) { currentLang = saved; }
}

if (typeof document !== 'undefined') { 
    $effect.root(() => {
        document.documentElement.lang = currentLang;
    });
}