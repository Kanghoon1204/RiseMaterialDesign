
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../i18n/translations';

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="container mx-auto max-w-5xl p-8 lg:p-12 text-neutral-800 dark:text-neutral-200">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 mb-4">
          {t.home.title}
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl">
          {t.home.description}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">{t.home.exploreComponents}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {t.home.exploreComponentsDesc}
          </p>
          <Link to="/components/button" className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            {t.home.goToButtons} <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">{t.home.responsiveDesign}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {t.home.responsiveDesignDesc}
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">{t.home.lightDarkModes}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {t.home.lightDarkModesDesc}
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">{t.home.builtWithTailwind}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {t.home.builtWithTailwindDesc}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
