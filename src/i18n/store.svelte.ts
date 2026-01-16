import en from './en.json';
import pl from './pl.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import gr from './gr.json';
import zh from './zh.json';
import yue from './yue.json';

type TranslationSchema = typeof en;

const translationsMap: Record<string, TranslationSchema> = {
    en, pl, de, es, fr, it, gr, zh, yue
};

function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj) || path;
}

let currentLang = $state('en');
const listeners = new Set<(lang: string) => void>();

export const i18n = {
    get lang() {
        return currentLang;
    },
    
    setLang(lang: 'en' | 'pl' | 'de' | 'es' | 'fr' | 'it' | 'gr' | 'zh' | 'yue') {
        currentLang = lang;
        listeners.forEach(cb => cb(lang));

        if (typeof document !== 'undefined') {
            document.documentElement.lang = lang;
        }

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('sba_lang', lang);
        }
    },

    t(key: string): string {
        const translations = translationsMap[currentLang] || en;
        return getNestedValue(translations, key);
    },

    subscribe(fn: (value: { lang: string, t: (key: string) => string }) => void) {
        const update = () => fn({ lang: currentLang, t: i18n.t });
        listeners.add(update);
        update();
        return () => listeners.delete(update);
    }
};

if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('sba_lang');
    if (saved && saved in translationsMap) {
        currentLang = saved as any;
    }
}

// Set initial lang attribute - updates are handled by setLang function
if (typeof document !== 'undefined') {
    document.documentElement.lang = currentLang;
}
