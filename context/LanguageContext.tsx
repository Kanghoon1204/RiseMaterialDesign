
import React, { createContext, useState, useEffect, useMemo } from 'react';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedLanguage = window.localStorage.getItem('language') as Language;
      if (storedLanguage) return storedLanguage;
      return navigator.language.startsWith('ko') ? 'ko' : 'en';
    }
    return 'ko';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prevLang) => (prevLang === 'ko' ? 'en' : 'ko'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = useMemo(() => ({ language, toggleLanguage, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
