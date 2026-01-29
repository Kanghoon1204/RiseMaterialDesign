
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
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            {t.home.title}
          </h1>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
            24 {language === 'ko' ? '컴포넌트' : 'Components'}
          </span>
        </div>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-4">
          {t.home.subtitle}
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {t.home.description}
        </p>
      </header>

      {/* What is M3 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          {t.home.whatIsM3}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {t.home.whatIsM3Desc}
        </p>
      </section>

      {/* Core Principles */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          {t.home.corePrinciples}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-100 dark:border-violet-800">
            <h3 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">
              {t.home.dynamicColor}
            </h3>
            <p className="text-sm text-violet-600 dark:text-violet-400 leading-relaxed">
              {t.home.dynamicColorDesc}
            </p>
          </div>
          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              {t.home.accessibility}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">
              {t.home.accessibilityDesc}
            </p>
          </div>
          <div className="p-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
            <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">
              {t.home.adaptiveDesign}
            </h3>
            <p className="text-sm text-teal-600 dark:text-teal-400 leading-relaxed">
              {t.home.adaptiveDesignDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Component Categories */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          {t.home.componentCategories}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/components/button"
            className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.home.actions}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.home.actionsDesc}
            </p>
          </Link>
          <Link
            to="/components/badge"
            className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.home.communication}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.home.communicationDesc}
            </p>
          </Link>
          <Link
            to="/components/card"
            className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.home.containment}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.home.containmentDesc}
            </p>
          </Link>
          <Link
            to="/components/navigation-bar"
            className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.home.navigation}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.home.navigationDesc}
            </p>
          </Link>
          <Link
            to="/components/checkbox"
            className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.home.selection}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.home.selectionDesc}
            </p>
          </Link>
          <Link
            to="/components/text-field"
            className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.home.textInputs}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.home.textInputsDesc}
            </p>
          </Link>
        </div>
      </section>

      {/* How to Use */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          {t.home.howToUse}
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {t.home.step1}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t.home.step1Desc}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {t.home.step2}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t.home.step2Desc}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {t.home.step3}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t.home.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          {t.home.resources}
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://m3.material.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <span>{t.home.m3Guidelines}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.figma.com/community/file/1035203688168086460"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <span>{t.home.figmaKit}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
