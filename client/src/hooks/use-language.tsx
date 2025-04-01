import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageContextType = {
  language: 'cn' | 'en';
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<'cn' | 'en'>(
    (localStorage.getItem('language') as 'cn' | 'en') || 'cn'
  );

  // Set initial language
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLanguage = language === 'cn' ? 'en' : 'cn';
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}