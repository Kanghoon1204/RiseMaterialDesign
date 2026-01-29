
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NAV_DATA } from '../constants';
import { CODE_SNIPPETS, CodeSnippetItem } from '../constants/codeSnippets';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../i18n/translations';

const ComponentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Code language: 'react' or 'flutter'
  const [codeLanguage, setCodeLanguage] = useState<'react' | 'flutter'>('react');
  // Scroll to top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll for showing/hiding scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const componentItem = NAV_DATA.flatMap(category => category.items).find(
    item => item.path === `/components/${id}`
  );

  const componentName = componentItem
    ? t.components[componentItem.key as keyof typeof t.components] || componentItem.key
    : "Component";

  const renderComponentExample = () => {
    switch(id) {
      case 'button': return <ButtonExample t={t} />;
      case 'fab': return <FABExample t={t} />;
      case 'icon-button': return <IconButtonExample t={t} />;
      case 'segmented-buttons': return <SegmentedButtonsExample t={t} />;
      case 'badge': return <BadgeExample t={t} />;
      case 'progress-indicators': return <ProgressIndicatorsExample t={t} />;
      case 'snackbar': return <SnackbarExample t={t} />;
      case 'card': return <CardExample t={t} />;
      case 'dialog': return <DialogExample t={t} />;
      case 'sheets-bottom': return <BottomSheetExample t={t} />;
      case 'tooltip': return <TooltipExample t={t} />;
      case 'bottom-app-bar': return <BottomAppBarExample t={t} />;
      case 'navigation-bar': return <NavigationBarExample t={t} />;
      case 'navigation-drawer': return <NavigationDrawerExample t={t} />;
      case 'tabs': return <TabsExample t={t} />;
      case 'top-app-bar': return <TopAppBarExample t={t} />;
      case 'checkbox': return <CheckboxExample t={t} />;
      case 'chips': return <ChipsExample t={t} />;
      case 'date-pickers': return <DatePickerExample t={t} />;
      case 'menus': return <MenusExample t={t} />;
      case 'radio-button': return <RadioButtonExample t={t} />;
      case 'slider': return <SliderExample t={t} />;
      case 'switch': return <SwitchExample t={t} />;
      case 'text-field': return <TextFieldExample t={t} />;
      default: return <p className="text-neutral-500">{t.componentPage.noExample}</p>;
    }
  }

  const usageKey = getUsageKey(id);
  const usage = usageKey ? t.usage[usageKey as keyof typeof t.usage] : null;

  const sectionLabels = {
    overview: language === 'ko' ? '개요' : 'Overview',
    example: language === 'ko' ? '예제' : 'Example',
    types: language === 'ko' ? '유형' : 'Types',
    states: language === 'ko' ? '상태' : 'States',
    anatomy: language === 'ko' ? '구조' : 'Anatomy',
    specs: language === 'ko' ? '스펙' : 'Specifications',
    whenToUse: language === 'ko' ? '언제 사용하나요?' : 'When to use',
    guidelines: language === 'ko' ? '가이드라인' : 'Guidelines',
    comparison: language === 'ko' ? '유사 컴포넌트와 비교' : 'Related components',
    details: language === 'ko' ? '상세 설정' : 'Configuration',
    dos: language === 'ko' ? '권장 사항' : 'Do\'s',
    donts: language === 'ko' ? '주의 사항' : 'Don\'ts',
    bestPractices: language === 'ko' ? '모범 사례' : 'Best practices',
    errorStates: language === 'ko' ? '오류 처리' : 'Error handling',
    accessibility: language === 'ko' ? '접근성' : 'Accessibility',
    note: language === 'ko' ? '참고 사항' : 'Note',
  };

  // Get overview from usage
  const overviewText = usage && 'overview' in usage ? usage.overview : t.componentPage.placeholder.replace('{name}', componentName);

  // Get adjacent components for prev/next navigation
  const allComponents = NAV_DATA.flatMap(category => category.items);
  const currentIndex = allComponents.findIndex(item => item.path === `/components/${id}`);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  // Build available sections for TOC
  const availableSections = [
    { id: 'overview', label: sectionLabels.overview, always: true },
    { id: 'example', label: sectionLabels.example, always: true },
    { id: 'types', label: sectionLabels.types, show: usage && 'types' in usage },
    { id: 'anatomy', label: sectionLabels.anatomy, show: usage && 'anatomy' in usage },
    { id: 'specs', label: sectionLabels.specs, show: usage && 'specs' in usage },
    { id: 'when-to-use', label: sectionLabels.whenToUse, show: usage && 'whenToUse' in usage },
    { id: 'guidelines', label: sectionLabels.guidelines, show: usage && 'guidelines' in usage },
    { id: 'dos-donts', label: language === 'ko' ? '권장/주의 사항' : 'Do\'s & Don\'ts', show: usage && ('dos' in usage || 'donts' in usage) },
    { id: 'accessibility', label: sectionLabels.accessibility, show: usage && 'accessibility' in usage },
  ].filter(s => s.always || s.show);

  return (
    <div className="container mx-auto max-w-5xl p-8 lg:p-12">
      {/* ==================== HEADER ==================== */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{t.componentPage.components}</span>
          <span className="text-neutral-300 dark:text-neutral-600">/</span>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">{componentName}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">{componentName}</h1>
      </header>

      {/* ==================== QUICK NAVIGATION (TOC) ==================== */}
      <nav className="mb-10 p-4 bg-slate-50 dark:bg-neutral-800/50 rounded-xl border border-slate-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {language === 'ko' ? '빠른 탐색' : 'Quick Navigation'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg border border-slate-200 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ==================== 1. OVERVIEW ==================== */}
      <section id="overview" className="mb-12 scroll-mt-20">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.overview}</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {overviewText}
        </p>
      </section>

      {/* ==================== 2. COMPONENT EXAMPLES (1:1 Preview + Code) ==================== */}
      <section id="example" className="mb-12 scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{sectionLabels.example}</h2>
          {/* Global Code Language Toggle */}
          {id && CODE_SNIPPETS[id]?.snippets && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {language === 'ko' ? '코드 언어:' : 'Code:'}
              </span>
              <div className="flex gap-1 bg-slate-100 dark:bg-neutral-700 rounded-lg p-0.5">
                <button
                  onClick={() => setCodeLanguage('react')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    codeLanguage === 'react'
                      ? 'bg-white dark:bg-neutral-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  React
                </button>
                <button
                  onClick={() => setCodeLanguage('flutter')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    codeLanguage === 'flutter'
                      ? 'bg-white dark:bg-neutral-600 text-cyan-600 dark:text-cyan-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  Flutter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 1:1 Example Cards */}
        <div className="space-y-4">
          {id && CODE_SNIPPETS[id]?.snippets ? (
            CODE_SNIPPETS[id].snippets.map((snippet, index) => (
              <ExampleWithCode
                key={index}
                componentId={id}
                snippet={snippet}
                codeLanguage={codeLanguage}
                language={language}
                index={index}
              />
            ))
          ) : (
            <div className="p-8 border border-slate-200 dark:border-neutral-700 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50">
              {renderComponentExample()}
            </div>
          )}
        </div>
      </section>

      {/* ==================== 3. TYPES / STATES ==================== */}
      {usage && (('types' in usage && typeof usage.types === 'object') || ('states' in usage && typeof usage.states === 'object')) && (
        <section id="types" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            {'types' in usage ? sectionLabels.types : sectionLabels.states}
          </h2>
          <div className="grid gap-3">
            {Object.entries(('types' in usage ? usage.types : usage.states) as Record<string, string>).map(([key, value]) => (
              <div key={key} className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 min-w-[140px] capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 4. STATES (INTERACTION STATES) ==================== */}
      {usage && 'states' in usage && typeof usage.states === 'object' && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.states}</h2>
          <div className="grid gap-3">
            {Object.entries(usage.states as Record<string, string>).map(([key, value]) => (
              <div key={key} className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="font-semibold text-teal-600 dark:text-teal-400 min-w-[140px] capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 5. ANATOMY ==================== */}
      {usage && 'anatomy' in usage && (
        <section id="anatomy" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.anatomy}</h2>
          <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="whitespace-pre-line text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {usage.anatomy}
            </div>
          </div>
        </section>
      )}

      {/* ==================== 6. SPECIFICATIONS ==================== */}
      {usage && 'specs' in usage && (
        <section id="specs" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.specs}</h2>
          <div className="p-5 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-100 dark:border-cyan-800">
            <div className="whitespace-pre-line text-cyan-800 dark:text-cyan-200 leading-relaxed">
              {usage.specs}
            </div>
          </div>
        </section>
      )}

      {/* ==================== 7. WHEN TO USE / GUIDELINES ==================== */}
      {usage && (('usage' in usage) || ('guidelines' in usage)) && (
        <section id="when-to-use" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            {'usage' in usage ? sectionLabels.whenToUse : sectionLabels.guidelines}
          </h2>
          <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <p className="text-indigo-800 dark:text-indigo-200">
              {'usage' in usage ? usage.usage : ('guidelines' in usage ? usage.guidelines : '')}
            </p>
          </div>
        </section>
      )}

      {/* ==================== 8. COMPARISON ==================== */}
      {usage && ('vsSwitch' in usage || 'vsCheckbox' in usage || 'vsBottomNav' in usage) && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.comparison}</h2>
          <div className="space-y-3">
            {'vsSwitch' in usage && (
              <ComparisonCard
                title={language === 'ko' ? '스위치' : 'Switch'}
                description={usage.vsSwitch}
              />
            )}
            {'vsCheckbox' in usage && (
              <ComparisonCard
                title={language === 'ko' ? '체크박스' : 'Checkbox'}
                description={usage.vsCheckbox}
              />
            )}
            {'vsBottomNav' in usage && (
              <ComparisonCard
                title={language === 'ko' ? '하단 내비게이션' : 'Bottom Navigation'}
                description={usage.vsBottomNav}
              />
            )}
          </div>
        </section>
      )}

      {/* ==================== 9. CONFIGURATION / DETAILS ==================== */}
      {usage && ('toggle' in usage || 'content' in usage || 'duration' in usage || 'actions' in usage || 'placement' in usage || 'mixing' in usage || 'required' in usage) && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.details}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {'placement' in usage && (
              <ConfigCard
                title={language === 'ko' ? '배치' : 'Placement'}
                content={usage.placement}
              />
            )}
            {'toggle' in usage && (
              <ConfigCard
                title={language === 'ko' ? '토글' : 'Toggle'}
                content={usage.toggle}
              />
            )}
            {'content' in usage && (
              <ConfigCard
                title={language === 'ko' ? '콘텐츠' : 'Content'}
                content={usage.content}
              />
            )}
            {'duration' in usage && (
              <ConfigCard
                title={language === 'ko' ? '표시 시간' : 'Duration'}
                content={usage.duration as string}
              />
            )}
            {'actions' in usage && (
              <ConfigCard
                title={language === 'ko' ? '작업 버튼' : 'Actions'}
                content={usage.actions as string}
              />
            )}
            {'mixing' in usage && (
              <ConfigCard
                title={language === 'ko' ? '혼합 사용' : 'Mixing Types'}
                content={usage.mixing as string}
              />
            )}
            {'required' in usage && (
              <ConfigCard
                title={language === 'ko' ? '필수 표시' : 'Required Fields'}
                content={usage.required as string}
              />
            )}
          </div>
        </section>
      )}

      {/* ==================== 10. BEST PRACTICES ==================== */}
      {usage && 'bestPractices' in usage && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.bestPractices}</h2>
          <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 whitespace-pre-line leading-relaxed">{usage.bestPractices}</p>
          </div>
        </section>
      )}

      {/* ==================== 11. DO'S AND DON'TS ==================== */}
      {usage && ('dos' in usage || 'donts' in usage) && (
        <section id="dos-donts" className="mb-12 scroll-mt-20">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Do's */}
            {'dos' in usage && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
                <div className="px-5 py-3 bg-emerald-500 dark:bg-emerald-600">
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {sectionLabels.dos}
                  </h2>
                </div>
                <ul className="p-4 space-y-3">
                  {(usage.dos as string).split('\n').filter(line => line.trim()).map((line, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{line.replace(/^[•\-]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Don'ts */}
            {'donts' in usage && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
                <div className="px-5 py-3 bg-rose-500 dark:bg-rose-600">
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {sectionLabels.donts}
                  </h2>
                </div>
                <ul className="p-4 space-y-3">
                  {(usage.donts as string).split('\n').filter(line => line.trim()).map((line, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-rose-500 dark:bg-rose-400" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{line.replace(/^[•\-]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ==================== 12. ERROR STATES ==================== */}
      {usage && 'errorStates' in usage && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.errorStates}</h2>
          <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 whitespace-pre-line leading-relaxed">{usage.errorStates}</p>
          </div>
        </section>
      )}

      {/* ==================== 13. ACCESSIBILITY ==================== */}
      {usage && 'accessibility' in usage && (
        <section id="accessibility" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.accessibility}</h2>
          <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200 whitespace-pre-line leading-relaxed">{usage.accessibility}</p>
          </div>
        </section>
      )}

      {/* ==================== 14. NOTE ==================== */}
      {usage && 'note' in usage && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">{sectionLabels.note}</h2>
          <div className="p-5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200 whitespace-pre-line leading-relaxed">{usage.note}</p>
          </div>
        </section>
      )}

      {/* ==================== PREV/NEXT NAVIGATION ==================== */}
      <nav className="mt-16 pt-8 border-t border-slate-200 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          {prevComponent ? (
            <Link
              to={prevComponent.path}
              className="group flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{language === 'ko' ? '이전' : 'Previous'}</div>
                <div className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t.components[prevComponent.key as keyof typeof t.components] || prevComponent.key}
                </div>
              </div>
            </Link>
          ) : <div />}

          {nextComponent ? (
            <Link
              to={nextComponent.path}
              className="group flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{language === 'ko' ? '다음' : 'Next'}</div>
                <div className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t.components[nextComponent.key as keyof typeof t.components] || nextComponent.key}
                </div>
              </div>
              <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>

        {/* Study Progress Indicator */}
        <div className="mt-6 text-center">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {language === 'ko'
              ? `${currentIndex + 1} / ${allComponents.length} 컴포넌트 학습 중`
              : `Studying component ${currentIndex + 1} of ${allComponents.length}`
            }
          </span>
          <div className="mt-2 h-1.5 bg-slate-200 dark:bg-neutral-700 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / allComponents.length) * 100}%` }}
            />
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          aria-label={language === 'ko' ? '맨 위로' : 'Scroll to top'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );

  // Comparison card component
  function ComparisonCard({ title, description }: { title: string; description: string }) {
    return (
      <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium rounded">
            vs
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{description}</p>
      </div>
    );
  }

  // Configuration card component
  function ConfigCard({ title, content }: { title: string; content: string }) {
    return (
      <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700">
        <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">{title}</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{content}</p>
      </div>
    );
  }

  // Example with Code - 1:1 matching preview and code
  function ExampleWithCode({ componentId, snippet, codeLanguage: codeLang, language: lang, index }: {
    key?: React.Key;
    componentId: string;
    snippet: CodeSnippetItem;
    codeLanguage: 'react' | 'flutter';
    language: string;
    index: number;
  }) {
    const [isCopied, setIsCopied] = React.useState(false);
    const [showCode, setShowCode] = React.useState(true);

    const handleCopy = () => {
      const code = codeLang === 'react' ? snippet.react : snippet.flutter;
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };

    const title = lang === 'ko' ? snippet.titleKo : snippet.title;
    const code = codeLang === 'react' ? snippet.react : snippet.flutter;

    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-neutral-800/80 border-b border-slate-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded">
                {index + 1}
              </span>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
                  showCode
                    ? 'bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-200'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {showCode ? (lang === 'ko' ? '코드 숨기기' : 'Hide Code') : (lang === 'ko' ? '코드 보기' : 'Show Code')}
              </button>
            </div>
          </div>
        </div>

        {/* Content: Preview + Code side by side */}
        <div className={`grid ${showCode ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Preview */}
          <div className="p-6 bg-gradient-to-br from-slate-50 to-white dark:from-neutral-900/30 dark:to-neutral-800/30 flex items-center justify-center min-h-[100px] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-neutral-700">
            <ComponentPreview componentId={componentId} variantIndex={index} t={t} language={lang} />
          </div>

          {/* Code */}
          {showCode && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-3 py-2 bg-neutral-800 dark:bg-neutral-900 border-b border-neutral-700">
                <span className="text-xs text-neutral-400 font-medium">
                  {codeLang === 'react' ? 'React / JSX' : 'Flutter / Dart'}
                </span>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded transition-all ${
                    isCopied
                      ? 'text-green-400 bg-green-900/30'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {lang === 'ko' ? '복사됨' : 'Copied'}
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {lang === 'ko' ? '복사' : 'Copy'}
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 bg-neutral-900 dark:bg-neutral-950 overflow-x-auto flex-1">
                <pre className="text-xs text-neutral-100 font-mono leading-relaxed whitespace-pre">{code}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Component Preview - renders the actual visual for each variant
  function ComponentPreview({ componentId, variantIndex, t, language: lang }: { componentId: string; variantIndex: number; t: any; language: string }) {
    // Button variants
    if (componentId === 'button') {
      const variants = [
        <button key="elevated" className="px-6 py-2.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 font-medium text-sm rounded-full shadow-md hover:shadow-lg transition-all">{t.button.elevated}</button>,
        <button key="filled" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 transition-all">{t.button.filled}</button>,
        <button key="tonal" className="px-6 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 font-medium text-sm rounded-full hover:bg-blue-200 transition-all">{t.button.tonal}</button>,
        <button key="outlined" className="px-6 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm rounded-full border border-blue-600 dark:border-blue-400 hover:bg-blue-50 transition-all">{t.button.outlined}</button>,
        <button key="text" className="px-6 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">{t.button.text}</button>,
        <button key="icon" className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 transition-all flex items-center gap-2"><SendIcon className="w-4 h-4" />{t.button.send}</button>,
        <button key="disabled" className="px-6 py-2.5 bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500 font-medium text-sm rounded-full cursor-not-allowed" disabled>{t.button.disabled}</button>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // FAB variants
    if (componentId === 'fab') {
      const variants = [
        <button key="standard" className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-2xl shadow-lg flex items-center justify-center"><PlusIcon className="w-6 h-6" /></button>,
        <button key="small" className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-xl shadow-md flex items-center justify-center"><EditIcon className="w-4 h-4" /></button>,
        <button key="large" className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-[28px] shadow-lg flex items-center justify-center"><PlusIcon className="w-9 h-9" /></button>,
        <button key="extended" className="px-5 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-2xl shadow-lg flex items-center gap-3 font-medium"><PlusIcon className="w-5 h-5" />{t.fab.create}</button>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Icon Button variants
    if (componentId === 'icon-button') {
      const variants = [
        <button key="standard" className="p-2.5 text-neutral-600 dark:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><SettingsIcon className="w-5 h-5" /></button>,
        <button key="filled" className="p-2.5 bg-blue-600 text-white rounded-full"><HeartIcon className="w-5 h-5" /></button>,
        <button key="tonal" className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full"><BookmarkIcon className="w-5 h-5" /></button>,
        <button key="outlined" className="p-2.5 text-neutral-600 dark:text-neutral-300 rounded-full border border-neutral-300 dark:border-neutral-600"><ShareIcon className="w-5 h-5" /></button>,
        <button key="toggle" className="p-2.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 rounded-full"><HeartIcon className="w-5 h-5" /></button>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Checkbox variants (3 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'checkbox') {
      const CheckboxPreview = ({ variant }: { variant: number }) => {
        const [checked, setChecked] = React.useState(false);
        const [checkedWithLabel, setCheckedWithLabel] = React.useState(false);
        const [items, setItems] = React.useState([false, false, false]);

        if (variant === 0) {
          // Basic Checkbox
          return (
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-blue-600 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {checked ? (t.checkbox?.checked || 'Checked') : (t.checkbox?.unchecked || 'Unchecked')}
              </span>
            </label>
          );
        }

        if (variant === 1) {
          // Checkbox with Label
          return (
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checkedWithLabel}
                onChange={(e) => setCheckedWithLabel(e.target.checked)}
                className="w-5 h-5 rounded border-2 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {language === 'ko' ? '이용약관에 동의합니다' : 'Accept terms and conditions'}
              </span>
            </label>
          );
        }

        // Indeterminate Checkbox (variant 2)
        const allChecked = items.every(Boolean);
        const someChecked = items.some(Boolean);

        return (
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allChecked}
                ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
                onChange={() => setItems(allChecked ? [false, false, false] : [true, true, true])}
                className="w-5 h-5 rounded border-2 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {language === 'ko' ? '전체 선택' : 'Select All'}
              </span>
            </label>
            <div className="ml-6 space-y-1">
              {[language === 'ko' ? '옵션 1' : 'Option 1', language === 'ko' ? '옵션 2' : 'Option 2', language === 'ko' ? '옵션 3' : 'Option 3'].map((label, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={items[i]}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[i] = e.target.checked;
                      setItems(newItems);
                    }}
                    className="w-4 h-4 rounded border-2 text-blue-600 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      };
      return <CheckboxPreview variant={variantIndex} />;
    }

    // Switch variants (3 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'switch') {
      const SwitchPreview = ({ variant }: { variant: number }) => {
        const [enabled, setEnabled] = React.useState(false);
        const [notifications, setNotifications] = React.useState(true);
        const [withIcon, setWithIcon] = React.useState(false);

        const SwitchBase = ({ on, onChange, showIcon }: { on: boolean; onChange: () => void; showIcon?: boolean }) => (
          <div
            onClick={onChange}
            className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors ${on ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-600'}`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all flex items-center justify-center ${on ? 'right-1' : 'left-1'}`}
            >
              {showIcon && (
                <span className={`text-xs ${on ? 'text-blue-600' : 'text-neutral-400'}`}>
                  {on ? '✓' : ''}
                </span>
              )}
            </div>
          </div>
        );

        if (variant === 0) {
          // Basic Switch
          return <SwitchBase on={enabled} onChange={() => setEnabled(!enabled)} />;
        }

        if (variant === 1) {
          // Switch with Label
          return (
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <SwitchBase on={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {language === 'ko' ? '알림 활성화' : 'Enable notifications'}
              </span>
            </label>
          );
        }

        // Switch with Icons (variant 2)
        return <SwitchBase on={withIcon} onChange={() => setWithIcon(!withIcon)} showIcon />;
      };
      return <SwitchPreview variant={variantIndex} />;
    }

    // Card variants
    if (componentId === 'card') {
      const variants = [
        <div key="elevated" className="w-52 p-4 bg-white dark:bg-neutral-700 rounded-xl shadow-md"><p className="font-medium text-neutral-900 dark:text-white text-sm">{t.card?.elevated || 'Elevated Card'}</p><p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t.card?.withShadow || 'With shadow'}</p></div>,
        <div key="filled" className="w-52 p-4 bg-slate-100 dark:bg-neutral-600 rounded-xl"><p className="font-medium text-neutral-900 dark:text-white text-sm">{t.card?.filled || 'Filled Card'}</p><p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t.card?.tonalSurface || 'Tonal surface'}</p></div>,
        <div key="outlined" className="w-52 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-300 dark:border-neutral-600"><p className="font-medium text-neutral-900 dark:text-white text-sm">{t.card?.outlined || 'Outlined Card'}</p><p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t.card?.withBorder || 'With border'}</p></div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Chips variants
    // Chips variants (4 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'chips') {
      const ChipsPreview = ({ variant }: { variant: number }) => {
        const [clicked, setClicked] = React.useState(false);
        const [selected, setSelected] = React.useState(false);
        const [visible, setVisible] = React.useState(true);
        const [suggested, setSuggested] = React.useState(false);

        if (variant === 0) {
          // Assist Chip
          return (
            <button
              onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 1000); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${clicked ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200' : 'bg-slate-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-600'}`}
            >
              <CalendarIcon className="w-4 h-4" />
              {clicked ? (language === 'ko' ? '알람 설정됨!' : 'Alarm set!') : (language === 'ko' ? '알람 설정' : 'Set alarm')}
            </button>
          );
        }

        if (variant === 1) {
          // Filter Chip
          return (
            <button
              onClick={() => setSelected(!selected)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${selected ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200' : 'bg-slate-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-600'}`}
            >
              {selected && <CheckIcon className="w-4 h-4" />}
              {language === 'ko' ? '채식주의' : 'Vegetarian'}
            </button>
          );
        }

        if (variant === 2) {
          // Input Chip
          if (!visible) {
            return (
              <button
                onClick={() => setVisible(true)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-neutral-700 rounded-lg text-sm text-neutral-500 hover:bg-slate-200 dark:hover:bg-neutral-600"
              >
                + {language === 'ko' ? '다시 추가' : 'Add back'}
              </button>
            );
          }
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-neutral-700 rounded-lg text-sm text-neutral-700 dark:text-neutral-300">
              John Doe
              <button
                onClick={() => setVisible(false)}
                className="w-4 h-4 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
          );
        }

        // Suggestion Chip (variant 3)
        return (
          <button
            onClick={() => { setSuggested(true); setTimeout(() => setSuggested(false), 1500); }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${suggested ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200' : 'bg-slate-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-600'}`}
          >
            {suggested ? (language === 'ko' ? '검색 중...' : 'Searching...') : (language === 'ko' ? '"오늘 날씨" 검색' : 'Try "weather today"')}
          </button>
        );
      };
      return <ChipsPreview variant={variantIndex} />;
    }

    // Badge variants
    if (componentId === 'badge') {
      const variants = [
        <div key="dot" className="relative inline-block"><span className="p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg inline-block"><BellIconComponent className="w-6 h-6 text-neutral-600 dark:text-neutral-300" /></span><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-neutral-800" /></div>,
        <div key="number" className="relative inline-block"><span className="p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg inline-block"><BellIconComponent className="w-6 h-6 text-neutral-600 dark:text-neutral-300" /></span><span className="absolute -top-2 -right-2 px-1.5 min-w-[20px] h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">5</span></div>,
        <div key="max" className="relative inline-block"><span className="p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg inline-block"><BellIconComponent className="w-6 h-6 text-neutral-600 dark:text-neutral-300" /></span><span className="absolute -top-2 -right-3 px-1.5 min-w-[20px] h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">99+</span></div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Progress Indicators variants
    if (componentId === 'progress-indicators') {
      const variants = [
        <div key="circularInd" className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />,
        <div key="circularDet" className="relative w-12 h-12"><svg className="w-12 h-12 -rotate-90"><circle cx="24" cy="24" r="20" fill="none" stroke="#dbeafe" strokeWidth="4" /><circle cx="24" cy="24" r="20" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="125" strokeDashoffset="30" strokeLinecap="round" /></svg><span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-blue-600">75%</span></div>,
        <div key="linearInd" className="w-48 h-1 bg-blue-200 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full animate-pulse" style={{width: '60%'}} /></div>,
        <div key="linearDet" className="w-48"><div className="flex justify-between text-xs text-neutral-500 mb-1"><span>Progress</span><span>50%</span></div><div className="h-1 bg-blue-200 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{width: '50%'}} /></div></div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Slider variants
    // Slider variants (3 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'slider') {
      const SliderPreview = ({ variant }: { variant: number }) => {
        const [continuous, setContinuous] = React.useState(50);
        const [discrete, setDiscrete] = React.useState(50);
        const [rangeStart, setRangeStart] = React.useState(25);
        const [rangeEnd, setRangeEnd] = React.useState(75);

        if (variant === 0) {
          // Continuous Slider
          return (
            <div className="w-48">
              <div className="flex justify-between text-xs text-neutral-500 mb-1">
                <span>{language === 'ko' ? '값' : 'Value'}</span>
                <span>{continuous}</span>
              </div>
              <input
                type="range"
                className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                value={continuous}
                onChange={(e) => setContinuous(Number(e.target.value))}
              />
            </div>
          );
        }

        if (variant === 1) {
          // Discrete Slider
          return (
            <div className="w-48 flex flex-col items-center">
              <div className="flex justify-between w-full text-xs text-neutral-500 mb-1">
                <span>{language === 'ko' ? '단계' : 'Step'}</span>
                <span>{discrete}</span>
              </div>
              <input
                type="range"
                className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                step={25}
                value={discrete}
                onChange={(e) => setDiscrete(Number(e.target.value))}
              />
              <div className="flex justify-between w-full text-xs text-neutral-400 mt-1">
                <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
              </div>
            </div>
          );
        }

        // Range Slider (variant 2)
        return (
          <div className="w-48">
            <div className="flex justify-between text-xs text-neutral-500 mb-1">
              <span>{language === 'ko' ? '범위' : 'Range'}</span>
              <span>{rangeStart} - {rangeEnd}</span>
            </div>
            <div className="relative h-6 flex items-center">
              <div className="absolute w-full h-1 bg-blue-200 rounded-lg" />
              <div
                className="absolute h-1 bg-blue-600 rounded-lg"
                style={{ left: `${rangeStart}%`, right: `${100 - rangeEnd}%` }}
              />
              <input
                type="range"
                className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                value={rangeStart}
                onChange={(e) => setRangeStart(Math.min(Number(e.target.value), rangeEnd - 10))}
              />
              <input
                type="range"
                className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(Math.max(Number(e.target.value), rangeStart + 10))}
              />
            </div>
          </div>
        );
      };
      return <SliderPreview variant={variantIndex} />;
    }

    // Segmented Buttons variants (2 to match CODE_SNIPPETS)
    // Segmented Buttons variants (2 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'segmented-buttons') {
      const SegmentedPreview = ({ variant }: { variant: number }) => {
        const [singleSelected, setSingleSelected] = React.useState(0);
        const [multiSelected, setMultiSelected] = React.useState([true, false, true]);
        const singleOptions = [language === 'ko' ? '일' : 'Day', language === 'ko' ? '주' : 'Week', language === 'ko' ? '월' : 'Month'];
        const multiOptions = ['S', 'M', 'L'];

        if (variant === 0) {
          // Single Selection
          return (
            <div className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-600 overflow-hidden">
              {singleOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSingleSelected(i)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${i > 0 ? 'border-l border-neutral-300 dark:border-neutral-600' : ''} ${singleSelected === i ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          );
        }

        // Multi Selection (variant 1)
        const toggleMulti = (index: number) => {
          const newSelected = [...multiSelected];
          newSelected[index] = !newSelected[index];
          setMultiSelected(newSelected);
        };

        return (
          <div className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-600 overflow-hidden">
            {multiOptions.map((option, i) => (
              <button
                key={i}
                onClick={() => toggleMulti(i)}
                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${i > 0 ? 'border-l border-neutral-300 dark:border-neutral-600' : ''} ${multiSelected[i] ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
              >
                {multiSelected[i] && <CheckIcon className="w-4 h-4" />}
                {option}
              </button>
            ))}
          </div>
        );
      };
      return <SegmentedPreview variant={variantIndex} />;
    }

    // Snackbar variants (3 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'snackbar') {
      const SnackbarPreview = ({ variant }: { variant: number }) => {
        const [visible, setVisible] = React.useState(false);
        const [undone, setUndone] = React.useState(false);

        const showSnackbar = () => {
          setVisible(true);
          setUndone(false);
          setTimeout(() => setVisible(false), 4000);
        };

        const handleUndo = () => {
          setUndone(true);
          setTimeout(() => { setVisible(false); setUndone(false); }, 1000);
        };

        if (variant === 0) {
          // Simple Snackbar
          return (
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={showSnackbar}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'ko' ? '메시지 보내기' : 'Send Message'}
              </button>
              <div className={`px-4 py-3 bg-neutral-800 dark:bg-neutral-700 text-white text-sm rounded-lg shadow-lg transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {language === 'ko' ? '메시지가 전송되었습니다' : 'Message sent'}
              </div>
            </div>
          );
        }

        if (variant === 1) {
          // Snackbar with Action
          return (
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={showSnackbar}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'ko' ? '이메일 보관' : 'Archive Email'}
              </button>
              <div className={`px-4 py-3 bg-neutral-800 dark:bg-neutral-700 text-white text-sm rounded-lg shadow-lg flex items-center gap-4 transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <span>{undone ? (language === 'ko' ? '실행 취소됨' : 'Undone') : (language === 'ko' ? '이메일이 보관되었습니다' : 'Email archived')}</span>
                {!undone && (
                  <button onClick={handleUndo} className="text-blue-400 font-medium hover:text-blue-300">
                    {language === 'ko' ? '실행 취소' : 'Undo'}
                  </button>
                )}
              </div>
            </div>
          );
        }

        // Snackbar with Close (variant 2)
        return (
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={showSnackbar}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {language === 'ko' ? '항목 삭제' : 'Delete Item'}
            </button>
            <div className={`px-4 py-3 bg-neutral-800 dark:bg-neutral-700 text-white text-sm rounded-lg shadow-lg flex items-center gap-3 transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <span>{undone ? (language === 'ko' ? '실행 취소됨' : 'Undone') : (language === 'ko' ? '항목이 삭제되었습니다' : 'Item deleted')}</span>
              {!undone && (
                <>
                  <button onClick={handleUndo} className="text-blue-400 font-medium hover:text-blue-300">
                    {language === 'ko' ? '실행 취소' : 'Undo'}
                  </button>
                  <button onClick={() => setVisible(false)} className="text-neutral-400 hover:text-white">✕</button>
                </>
              )}
            </div>
          </div>
        );
      };
      return <SnackbarPreview variant={variantIndex} />;
    }

    // Dialog variants (4 to match CODE_SNIPPETS)
    // Dialog variants (2 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'dialog') {
      const DialogPreview = ({ variant }: { variant: number }) => {
        const [open, setOpen] = React.useState(false);
        const [result, setResult] = React.useState<string | null>(null);

        const handleAction = (action: string) => {
          setResult(action);
          setOpen(false);
          setTimeout(() => setResult(null), 2000);
        };

        if (variant === 0) {
          // Basic Dialog
          return (
            <div>
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'ko' ? '다이얼로그 열기' : 'Open Dialog'}
              </button>
              {result && (
                <div className="mt-2 px-3 py-1.5 bg-neutral-800 text-white text-sm rounded-lg inline-block">
                  {result}
                </div>
              )}
              {open && (
                <>
                  <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
                  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="w-72 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 animate-in zoom-in-95 duration-200">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        {language === 'ko' ? '기본 다이얼로그' : 'Basic Dialog'}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        {language === 'ko' ? '간단한 메시지가 포함된 기본 다이얼로그입니다.' : 'This is a basic dialog with a simple message.'}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleAction('Cancelled')} className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          {language === 'ko' ? '취소' : 'Cancel'}
                        </button>
                        <button onClick={() => handleAction('Confirmed!')} className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          {language === 'ko' ? '확인' : 'OK'}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        }

        // Alert Dialog (variant 1)
        return (
          <div>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {language === 'ko' ? '삭제' : 'Delete'}
            </button>
            {result && (
              <div className="mt-2 px-3 py-1.5 bg-neutral-800 text-white text-sm rounded-lg inline-block">
                {result}
              </div>
            )}
            {open && (
              <>
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div className="w-72 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 animate-in zoom-in-95 duration-200">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      {language === 'ko' ? '파일을 삭제하시겠습니까?' : 'Delete file?'}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      {language === 'ko' ? '이 작업은 취소할 수 없습니다.' : 'This action cannot be undone.'}
                    </p>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleAction('Cancelled')} className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                        {language === 'ko' ? '취소' : 'Cancel'}
                      </button>
                      <button onClick={() => handleAction('Deleted!')} className="px-4 py-2 text-sm bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors">
                        {language === 'ko' ? '삭제' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      };
      return <DialogPreview variant={variantIndex} />;
    }

    // Bottom Sheet variants (5 to match CODE_SNIPPETS)
    if (componentId === 'sheets-bottom') {
      const variants = [
        <div key="standard" className="w-72 bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl">
          <div className="flex justify-center pt-3 pb-2"><div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full" /></div>
          <div className="p-4 space-y-3">
            <button className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg flex items-center gap-3"><ShareIcon className="w-5 h-5" />Share</button>
            <button className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg flex items-center gap-3"><LinkIconComponent className="w-5 h-5" />Get link</button>
            <button className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg flex items-center gap-3"><EditIcon className="w-5 h-5" />Edit</button>
          </div>
        </div>,
        <div key="modal" className="w-72 bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl">
          <div className="flex justify-center pt-3 pb-2"><div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full" /></div>
          <div className="px-4 pb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Sort by</h3>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg">Name</button>
              <button className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg">Date</button>
              <button className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg">Size</button>
            </div>
          </div>
        </div>,
        <div key="expanded" className="w-72 bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl">
          <div className="flex justify-center pt-3 pb-2"><div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full" /></div>
          <div className="px-4 pb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">File Details</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">document.pdf • 2.4 MB</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <button className="p-3 bg-slate-100 dark:bg-neutral-700 rounded-xl"><ShareIcon className="w-5 h-5 mx-auto mb-1" /><span className="text-xs">Share</span></button>
              <button className="p-3 bg-slate-100 dark:bg-neutral-700 rounded-xl"><DownloadIcon className="w-5 h-5 mx-auto mb-1" /><span className="text-xs">Download</span></button>
              <button className="p-3 bg-slate-100 dark:bg-neutral-700 rounded-xl"><TrashIcon className="w-5 h-5 mx-auto mb-1" /><span className="text-xs">Delete</span></button>
            </div>
          </div>
        </div>,
        <div key="scrollable" className="w-72 bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl max-h-48 overflow-hidden">
          <div className="sticky top-0 bg-white dark:bg-neutral-800 flex justify-center pt-3 pb-2"><div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full" /></div>
          <div className="px-4 pb-4 space-y-2">
            {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'].map((opt, i) => (
              <button key={i} className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg">{opt}</button>
            ))}
          </div>
        </div>,
        <div key="fullscreen" className="w-72 bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <button className="text-blue-600 dark:text-blue-400 font-medium">Cancel</button>
            <h3 className="font-semibold text-neutral-900 dark:text-white">Create New</h3>
            <button className="text-blue-600 dark:text-blue-400 font-medium">Save</button>
          </div>
          <div className="p-4">
            <input className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm bg-transparent" placeholder="Enter name" />
          </div>
        </div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Tooltip variants
    if (componentId === 'tooltip') {
      const variants = [
        <div key="plain" className="relative inline-block">
          <button className="p-2 text-neutral-600 dark:text-neutral-300"><HeartIcon className="w-5 h-5" /></button>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 dark:bg-neutral-700 text-white text-xs rounded">Favorite</div>
        </div>,
        <div key="rich" className="relative inline-block">
          <button className="p-2 text-neutral-600 dark:text-neutral-300"><InfoIcon className="w-5 h-5" /></button>
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 px-3 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <div className="font-medium mb-1">Rich tooltip</div>
            <div className="text-neutral-500 dark:text-neutral-400">With additional description</div>
          </div>
        </div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Bottom App Bar variants
    if (componentId === 'bottom-app-bar') {
      const variants = [
        <div key="withFab" className="w-80 h-16 bg-slate-100 dark:bg-neutral-800 flex items-center justify-between px-4 rounded-t-xl relative">
          <div className="flex gap-4">
            <button className="p-2 text-neutral-600 dark:text-neutral-400"><MenuIconComponent className="w-6 h-6" /></button>
            <button className="p-2 text-neutral-600 dark:text-neutral-400"><SearchIconComponent className="w-6 h-6" /></button>
          </div>
          <div className="absolute right-4 -top-7"><button className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center"><PlusIcon className="w-6 h-6" /></button></div>
        </div>,
        <div key="simple" className="w-80 h-16 bg-slate-100 dark:bg-neutral-800 flex items-center justify-around px-4 rounded-t-xl">
          <button className="p-2 text-neutral-600 dark:text-neutral-400"><HomeIconComponent className="w-6 h-6" /></button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400"><SearchIconComponent className="w-6 h-6" /></button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400"><HeartIcon className="w-6 h-6" /></button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400"><PersonIcon className="w-6 h-6" /></button>
        </div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Navigation Bar variants (2 to match CODE_SNIPPETS)
    if (componentId === 'navigation-bar') {
      const variants = [
        <div key="threeItems" className="w-80 h-20 bg-slate-100 dark:bg-neutral-800 flex items-center justify-around rounded-t-xl">
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-blue-600 dark:text-blue-400">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full"><HomeIconComponent className="w-5 h-5" /></div>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-600 dark:text-neutral-400">
            <SearchIconComponent className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-600 dark:text-neutral-400">
            <PersonIcon className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>,
        <div key="fourItems" className="w-80 h-20 bg-slate-100 dark:bg-neutral-800 flex items-center justify-around rounded-t-xl">
          <button className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full"><HomeIconComponent className="w-5 h-5" /></div>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <HeartIcon className="w-6 h-6" />
            <span className="text-xs">Favorites</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <SearchIconComponent className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <PersonIcon className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Navigation Drawer variants (5 to match CODE_SNIPPETS)
    if (componentId === 'navigation-drawer') {
      const variants = [
        <div key="standard" className="w-64 bg-slate-50 dark:bg-neutral-800 rounded-r-2xl p-4">
          <h3 className="px-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Mail</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-3"><InboxIcon className="w-5 h-5" />Inbox<span className="ml-auto text-xs">24</span></button>
            <button className="w-full text-left px-3 py-2.5 text-neutral-700 dark:text-neutral-300 rounded-full text-sm flex items-center gap-3"><SendIcon className="w-5 h-5" />Sent</button>
            <button className="w-full text-left px-3 py-2.5 text-neutral-700 dark:text-neutral-300 rounded-full text-sm flex items-center gap-3"><TrashIcon className="w-5 h-5" />Trash</button>
          </div>
        </div>,
        <div key="modal" className="w-64 bg-white dark:bg-neutral-800 rounded-r-2xl shadow-xl">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">U</div>
              <div><div className="font-medium text-neutral-900 dark:text-white">Username</div><div className="text-xs text-neutral-500">user@email.com</div></div>
            </div>
          </div>
          <div className="p-2">
            <button className="w-full text-left px-3 py-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">Home</button>
            <button className="w-full text-left px-3 py-2.5 text-neutral-700 dark:text-neutral-300 rounded-full text-sm">Settings</button>
          </div>
        </div>,
        <div key="withDivider" className="w-64 bg-slate-50 dark:bg-neutral-800 rounded-r-2xl p-4">
          <h3 className="px-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Navigation</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-3"><HomeIconComponent className="w-5 h-5" />Home</button>
            <button className="w-full text-left px-3 py-2.5 text-neutral-700 dark:text-neutral-300 rounded-full text-sm flex items-center gap-3"><HeartIcon className="w-5 h-5" />Favorites</button>
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700 my-3" />
          <h3 className="px-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Labels</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2.5 text-neutral-700 dark:text-neutral-300 rounded-full text-sm flex items-center gap-3"><FlagIcon className="w-5 h-5 text-red-500" />Important</button>
          </div>
        </div>,
        <div key="withHeader" className="w-64 bg-white dark:bg-neutral-800 rounded-r-2xl shadow-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-600 p-4 flex items-end">
            <div><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mb-2">JD</div><div className="text-white font-medium">John Doe</div></div>
          </div>
          <div className="p-2">
            <button className="w-full text-left px-3 py-2.5 text-neutral-700 dark:text-neutral-300 rounded-full text-sm flex items-center gap-3"><SettingsIcon className="w-5 h-5" />Settings</button>
          </div>
        </div>,
        <div key="rail" className="w-20 bg-slate-50 dark:bg-neutral-800 rounded-r-2xl py-4 flex flex-col items-center gap-2">
          <button className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl"><HomeIconComponent className="w-6 h-6" /></button>
          <button className="p-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-2xl"><SearchIconComponent className="w-6 h-6" /></button>
          <button className="p-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-2xl"><SettingsIcon className="w-6 h-6" /></button>
        </div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Tabs variants
    // Tabs variants (3 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'tabs') {
      const TabsPreview = ({ variant }: { variant: number }) => {
        const [activeTab, setActiveTab] = React.useState(0);
        const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
        const tabsWithIcons = [
          { label: language === 'ko' ? '홈' : 'Home', Icon: HomeIconComponent },
          { label: language === 'ko' ? '즐겨찾기' : 'Favorites', Icon: HeartIcon },
          { label: language === 'ko' ? '설정' : 'Settings', Icon: SettingsIcon },
        ];

        if (variant === 0) {
          // Primary Tabs
          return (
            <div className="w-80">
              <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === i ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                {language === 'ko' ? `탭 ${activeTab + 1} 내용` : `Content for ${tabs[activeTab]}`}
              </div>
            </div>
          );
        }

        if (variant === 1) {
          // Secondary Tabs (Pill style)
          return (
            <div className="w-80">
              <div className="flex bg-slate-100 dark:bg-neutral-800 rounded-lg p-1">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === i ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                {language === 'ko' ? `탭 ${activeTab + 1} 내용` : `Content for ${tabs[activeTab]}`}
              </div>
            </div>
          );
        }

        // Tabs with Icons (variant 2)
        return (
          <div className="w-80">
            <div className="flex border-b border-neutral-200 dark:border-neutral-700">
              {tabsWithIcons.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-1 transition-colors ${activeTab === i ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
                >
                  <tab.Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
              {language === 'ko' ? `${tabsWithIcons[activeTab].label} 내용` : `Content for ${tabsWithIcons[activeTab].label}`}
            </div>
          </div>
        );
      };
      return <TabsPreview variant={variantIndex} />;
    }

    // Top App Bar variants (6 to match CODE_SNIPPETS)
    if (componentId === 'top-app-bar') {
      const variants = [
        <div key="small" className="w-80 h-14 bg-slate-100 dark:bg-neutral-800 flex items-center px-4 rounded-b-xl">
          <button className="p-2 text-neutral-600 dark:text-neutral-400 -ml-2"><MenuIconComponent className="w-6 h-6" /></button>
          <h1 className="flex-1 text-lg font-medium text-neutral-900 dark:text-white ml-2">Title</h1>
          <button className="p-2 text-neutral-600 dark:text-neutral-400"><SearchIconComponent className="w-6 h-6" /></button>
        </div>,
        <div key="center" className="w-80 h-14 bg-slate-100 dark:bg-neutral-800 flex items-center justify-center px-4 rounded-b-xl relative">
          <button className="absolute left-4 p-2 text-neutral-600 dark:text-neutral-400"><ArrowBackIcon className="w-6 h-6" /></button>
          <h1 className="text-lg font-medium text-neutral-900 dark:text-white">Title</h1>
        </div>,
        <div key="medium" className="w-80 bg-slate-100 dark:bg-neutral-800 rounded-b-xl">
          <div className="h-14 flex items-center px-4">
            <button className="p-2 text-neutral-600 dark:text-neutral-400 -ml-2"><ArrowBackIcon className="w-6 h-6" /></button>
            <div className="flex-1" />
            <button className="p-2 text-neutral-600 dark:text-neutral-400"><MoreIcon className="w-6 h-6" /></button>
          </div>
          <div className="px-4 pb-4"><h1 className="text-2xl font-medium text-neutral-900 dark:text-white">Medium Title</h1></div>
        </div>,
        <div key="large" className="w-80 bg-slate-100 dark:bg-neutral-800 rounded-b-xl">
          <div className="h-14 flex items-center px-4">
            <button className="p-2 text-neutral-600 dark:text-neutral-400 -ml-2"><ArrowBackIcon className="w-6 h-6" /></button>
            <div className="flex-1" />
            <button className="p-2 text-neutral-600 dark:text-neutral-400"><SettingsIcon className="w-6 h-6" /></button>
          </div>
          <div className="px-4 pb-6"><h1 className="text-3xl font-medium text-neutral-900 dark:text-white">Large Title</h1></div>
        </div>,
        <div key="withSearch" className="w-80 bg-slate-100 dark:bg-neutral-800 rounded-b-xl">
          <div className="h-14 flex items-center px-4 gap-3">
            <button className="p-2 text-neutral-600 dark:text-neutral-400 -ml-2"><ArrowBackIcon className="w-6 h-6" /></button>
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-700 rounded-full">
              <SearchIconComponent className="w-5 h-5 text-neutral-500" />
              <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search..." />
            </div>
          </div>
        </div>,
        <div key="withTabs" className="w-80 bg-slate-100 dark:bg-neutral-800 rounded-b-xl">
          <div className="h-14 flex items-center px-4">
            <button className="p-2 text-neutral-600 dark:text-neutral-400 -ml-2"><MenuIconComponent className="w-6 h-6" /></button>
            <h1 className="flex-1 text-lg font-medium text-neutral-900 dark:text-white ml-2">App</h1>
          </div>
          <div className="flex border-t border-neutral-200 dark:border-neutral-700">
            <button className="flex-1 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600">Tab 1</button>
            <button className="flex-1 py-3 text-sm text-neutral-600 dark:text-neutral-400">Tab 2</button>
            <button className="flex-1 py-3 text-sm text-neutral-600 dark:text-neutral-400">Tab 3</button>
          </div>
        </div>,
      ];
      return variants[variantIndex] || variants[0];
    }

    // Date Pickers variants (2 to match CODE_SNIPPETS)
    // Date Pickers variants (2 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'date-pickers') {
      const DatePickerPreview = ({ variant }: { variant: number }) => {
        const [selectedDate, setSelectedDate] = React.useState(15);
        const [currentMonth, setCurrentMonth] = React.useState(0); // 0 = January
        const [currentYear, setCurrentYear] = React.useState(2025);

        const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthsKo = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        const months = language === 'ko' ? monthsKo : monthsEn;
        const daysEn = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const daysKo = ['일', '월', '화', '수', '목', '금', '토'];
        const days = language === 'ko' ? daysKo : daysEn;

        const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
        const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

        const handlePrevMonth = () => {
          if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
          } else {
            setCurrentMonth(currentMonth - 1);
          }
          setSelectedDate(1);
        };

        const handleNextMonth = () => {
          if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
          } else {
            setCurrentMonth(currentMonth + 1);
          }
          setSelectedDate(1);
        };

        const getDayName = (day: number, month: number, year: number) => {
          const date = new Date(year, month, day);
          const dayNames = language === 'ko'
            ? ['일', '월', '화', '수', '목', '금', '토']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return dayNames[date.getDay()];
        };

        const getFormattedDate = () => {
          const dayName = getDayName(selectedDate, currentMonth, currentYear);
          if (language === 'ko') {
            return `${currentMonth + 1}월 ${selectedDate}일 ${dayName}요일`;
          }
          return `${dayName}, ${monthsEn[currentMonth].slice(0, 3)} ${selectedDate}`;
        };

        if (variant === 0) {
          // Docked Date Picker
          return (
            <div className="w-72 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                >
                  ◀
                </button>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {language === 'ko' ? `${currentYear}년 ${months[currentMonth]}` : `${months[currentMonth]} ${currentYear}`}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                >
                  ▶
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {days.map((d, i) => <div key={i} className="py-1 text-neutral-500 font-medium">{d}</div>)}
                {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                {[...Array(daysInMonth)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i + 1)}
                    className={`py-1.5 rounded-full transition-colors ${
                      i + 1 === selectedDate
                        ? 'bg-blue-600 text-white'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        // Modal Date Picker (variant 1)
        return (
          <div className="w-72 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <div className="text-sm opacity-80">{language === 'ko' ? '날짜 선택' : 'SELECT DATE'}</div>
              <div className="text-2xl font-medium mt-1">{getFormattedDate()}</div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                >
                  ◀
                </button>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === 'ko' ? `${currentYear}년 ${months[currentMonth]}` : `${months[currentMonth]} ${currentYear}`}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                >
                  ▶
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {days.map((d, i) => <div key={i} className="py-1 text-neutral-500 font-medium">{d}</div>)}
                {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                {[...Array(daysInMonth)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i + 1)}
                    className={`py-1.5 rounded-full transition-colors ${
                      i + 1 === selectedDate
                        ? 'bg-blue-600 text-white'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      };
      return <DatePickerPreview variant={variantIndex} />;
    }

    // Menus variants (5 to match CODE_SNIPPETS)
    // Menus variants (2 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'menus') {
      const MenusPreview = ({ variant }: { variant: number }) => {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState<string | null>(null);

        const handleItemClick = (action: string) => {
          setSelected(action);
          setOpen(false);
          setTimeout(() => setSelected(null), 1500);
        };

        if (variant === 0) {
          // Basic Menu with icons
          return (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {language === 'ko' ? '메뉴 열기' : 'Open Menu'}
                <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {selected && (
                <div className="absolute top-full mt-2 px-3 py-1.5 bg-neutral-800 text-white text-sm rounded-lg">
                  {selected}
                </div>
              )}
              {open && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button onClick={() => handleItemClick('Cut')} className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-3">
                      <CutIcon className="w-4 h-4" />{language === 'ko' ? '잘라내기' : 'Cut'}
                    </button>
                    <button onClick={() => handleItemClick('Copy')} className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-3">
                      <CopyIcon className="w-4 h-4" />{language === 'ko' ? '복사' : 'Copy'}
                    </button>
                    <button onClick={() => handleItemClick('Paste')} className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-3">
                      <PasteIcon className="w-4 h-4" />{language === 'ko' ? '붙여넣기' : 'Paste'}
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        }

        // Menu with Divider (variant 1)
        return (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {language === 'ko' ? '설정' : 'Settings'}
              <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {selected && (
              <div className="absolute top-full mt-2 px-3 py-1.5 bg-neutral-800 text-white text-sm rounded-lg">
                {selected}
              </div>
            )}
            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button onClick={() => handleItemClick('Profile')} className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    {language === 'ko' ? '프로필' : 'Profile'}
                  </button>
                  <button onClick={() => handleItemClick('Settings')} className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    {language === 'ko' ? '설정' : 'Settings'}
                  </button>
                  <div className="border-t border-neutral-200 dark:border-neutral-700 my-1" />
                  <button onClick={() => handleItemClick('Logout')} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    {language === 'ko' ? '로그아웃' : 'Logout'}
                  </button>
                </div>
              </>
            )}
          </div>
        );
      };
      return <MenusPreview variant={variantIndex} />;
    }

    // Radio Button variants
    // Radio Button variants (1 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'radio-button') {
      const RadioPreview = () => {
        const [selected, setSelected] = React.useState('small');
        const options = [
          { value: 'small', label: language === 'ko' ? '소형' : 'Small' },
          { value: 'medium', label: language === 'ko' ? '중형' : 'Medium' },
          { value: 'large', label: language === 'ko' ? '대형' : 'Large' },
        ];

        return (
          <div role="radiogroup" className="space-y-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setSelected(option.value)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected === option.value ? 'border-blue-600' : 'border-neutral-400'}`}>
                  {selected === option.value && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                </div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{option.label}</span>
              </label>
            ))}
          </div>
        );
      };
      return <RadioPreview />;
    }

    // Text Field variants (5 to match CODE_SNIPPETS)
    // Text Field variants (5 to match CODE_SNIPPETS) - Interactive
    if (componentId === 'text-field') {
      const TextFieldPreview = ({ variant }: { variant: number }) => {
        const [filled, setFilled] = React.useState('');
        const [outlined, setOutlined] = React.useState('');
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('abc');
        const [search, setSearch] = React.useState('');

        if (variant === 0) {
          // Filled Text Field
          return (
            <div className="w-64">
              <div className={`bg-slate-100 dark:bg-neutral-700 rounded-t-lg px-4 pt-4 pb-2 border-b-2 ${filled ? 'border-blue-600' : 'border-neutral-400'}`}>
                <label className={`text-xs ${filled ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-500'}`}>Label</label>
                <input
                  className="w-full bg-transparent text-neutral-900 dark:text-white outline-none"
                  value={filled}
                  onChange={(e) => setFilled(e.target.value)}
                  placeholder={language === 'ko' ? '텍스트 입력' : 'Enter text'}
                />
              </div>
            </div>
          );
        }

        if (variant === 1) {
          // Outlined Text Field
          return (
            <div className="w-64">
              <div className={`relative border-2 rounded-lg px-4 py-3 ${outlined ? 'border-blue-600' : 'border-neutral-300 dark:border-neutral-600'}`}>
                <label className={`absolute -top-2.5 left-3 px-1 bg-white dark:bg-neutral-900 text-xs ${outlined ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-500'}`}>Label</label>
                <input
                  className="w-full bg-transparent text-neutral-900 dark:text-white outline-none"
                  value={outlined}
                  onChange={(e) => setOutlined(e.target.value)}
                  placeholder={language === 'ko' ? '텍스트 입력' : 'Enter text'}
                />
              </div>
            </div>
          );
        }

        if (variant === 2) {
          // With Helper
          return (
            <div className="w-64">
              <div className="relative border-2 border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-3 focus-within:border-blue-600">
                <label className="absolute -top-2.5 left-3 px-1 bg-white dark:bg-neutral-900 text-xs text-neutral-500 dark:text-neutral-400">Email</label>
                <input
                  className="w-full bg-transparent text-neutral-900 dark:text-white outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ko' ? '이메일 입력' : 'Enter email'}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1 px-4">{language === 'ko' ? '이메일은 공유되지 않습니다' : "We'll never share your email"}</p>
            </div>
          );
        }

        if (variant === 3) {
          // Error
          const hasError = password.length > 0 && password.length < 8;
          return (
            <div className="w-64">
              <div className={`bg-slate-100 dark:bg-neutral-700 rounded-t-lg px-4 pt-4 pb-2 border-b-2 ${hasError ? 'border-red-600' : 'border-blue-600'}`}>
                <label className={`text-xs ${hasError ? 'text-red-600' : 'text-blue-600'}`}>{language === 'ko' ? '비밀번호' : 'Password'}</label>
                <input
                  type="password"
                  className="w-full bg-transparent text-neutral-900 dark:text-white outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {hasError && <p className="text-xs text-red-600 mt-1 px-4">{language === 'ko' ? '8자 이상 입력해주세요' : 'Password must be at least 8 characters'}</p>}
            </div>
          );
        }

        // With Icons (variant 4)
        return (
          <div className="w-64">
            <div className="relative border-2 border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-3 flex items-center gap-2 focus-within:border-blue-600">
              <SearchIconComponent className="w-5 h-5 text-neutral-400" />
              <input
                className="flex-1 bg-transparent text-neutral-900 dark:text-white outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={language === 'ko' ? '검색...' : 'Search...'}
              />
              {search && (
                <button
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                  onClick={() => setSearch('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        );
      };
      return <TextFieldPreview variant={variantIndex} />;
    }

    // Default fallback
    return (
      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-600 dark:text-blue-300">
        {lang === 'ko' ? '미리보기' : 'Preview'} #{variantIndex + 1}
      </div>
    );
  }

  // Bell Icon for Badge
  function BellIconComponent({ className }: { className?: string }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    );
  }

  function getUsageKey(componentId: string | undefined): string | null {
    const mapping: Record<string, string> = {
      'button': 'button',
      'fab': 'fab',
      'icon-button': 'iconButton',
      'segmented-buttons': 'segmentedButton',
      'badge': 'badge',
      'progress-indicators': 'progress',
      'snackbar': 'snackbar',
      'card': 'card',
      'dialog': 'dialog',
      'sheets-bottom': 'bottomSheet',
      'tooltip': 'tooltip',
      'bottom-app-bar': 'bottomAppBar',
      'navigation-bar': 'navigationBar',
      'navigation-drawer': 'navigationDrawer',
      'tabs': 'tabs',
      'top-app-bar': 'topAppBar',
      'checkbox': 'checkbox',
      'chips': 'chips',
      'date-pickers': 'datePicker',
      'menus': 'menus',
      'radio-button': 'radioButton',
      'slider': 'slider',
      'switch': 'switchComp',
      'text-field': 'textField',
    };
    return componentId ? mapping[componentId] || null : null;
  }
};

// ===== SECTION TITLE COMPONENT =====
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">{children}</h3>
);

// ===== BUTTON EXAMPLE - ENHANCED =====
const ButtonExample: React.FC<{ t: any }> = ({ t }) => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Button Types */}
      <div>
        <SectionTitle>{t.button.types}</SectionTitle>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-6 py-2.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 font-medium text-sm rounded-full shadow-md hover:shadow-lg transition-all">
            {t.button.elevated}
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 active:bg-blue-800 transition-all">
            {t.button.filled}
          </button>
          <button className="px-6 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 font-medium text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-all">
            {t.button.tonal}
          </button>
          <button className="px-6 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm rounded-full border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
            {t.button.outlined}
          </button>
          <button className="px-6 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
            {t.button.text}
          </button>
        </div>
      </div>

      {/* Button with Icons */}
      <div>
        <SectionTitle>{t.button.withIcon}</SectionTitle>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 transition-all flex items-center gap-2">
            <SendIcon className="w-4 h-4" />
            {t.button.send}
          </button>
          <button className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 font-medium text-sm rounded-full hover:bg-blue-200 transition-all flex items-center gap-2">
            <EditIcon className="w-4 h-4" />
            {t.button.edit}
          </button>
          <button className="px-5 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm rounded-full border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all flex items-center gap-2">
            <ShareIcon className="w-4 h-4" />
            {t.button.share}
          </button>
          <button className="px-5 py-2.5 text-red-600 dark:text-red-400 font-medium text-sm rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all flex items-center gap-2">
            <TrashIcon className="w-4 h-4" />
            {t.button.delete}
          </button>
        </div>
      </div>

      {/* Button States */}
      <div>
        <SectionTitle>{t.button.states}</SectionTitle>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full transition-all">
            {t.button.enabled}
          </button>
          <button disabled className="px-6 py-2.5 bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500 font-medium text-sm rounded-full cursor-not-allowed">
            {t.button.disabled}
          </button>
          <button
            onClick={handleLoadingClick}
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full transition-all flex items-center gap-2 min-w-[120px] justify-center disabled:bg-blue-400"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t.button.loading}
              </>
            ) : t.button.save}
          </button>
        </div>
      </div>

      {/* Button Sizes */}
      <div>
        <SectionTitle>{t.button.sizes}</SectionTitle>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs rounded-full hover:bg-blue-700 transition-all">
            {t.button.small}
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 transition-all">
            {t.button.medium}
          </button>
          <button className="px-8 py-3.5 bg-blue-600 text-white font-medium text-base rounded-full hover:bg-blue-700 transition-all">
            {t.button.large}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== FAB EXAMPLE - ENHANCED =====
const FABExample: React.FC<{ t: any }> = ({ t }) => {
  const [extended, setExtended] = useState(true);

  return (
    <div className="space-y-10">
      {/* FAB Sizes */}
      <div>
        <SectionTitle>FAB {t.button.sizes}</SectionTitle>
        <div className="flex flex-wrap gap-6 items-end">
          <div className="text-center">
            <button className="w-10 h-10 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all">
              <PlusIcon className="w-5 h-5" />
            </button>
            <p className="text-xs text-neutral-500 mt-2">{t.fab.small}</p>
          </div>
          <div className="text-center">
            <button className="w-14 h-14 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all">
              <PlusIcon className="w-6 h-6" />
            </button>
            <p className="text-xs text-neutral-500 mt-2">{t.fab.regular}</p>
          </div>
          <div className="text-center">
            <button className="w-24 h-24 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 rounded-[28px] shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all">
              <PlusIcon className="w-9 h-9" />
            </button>
            <p className="text-xs text-neutral-500 mt-2">{t.fab.large}</p>
          </div>
        </div>
      </div>

      {/* Extended FAB */}
      <div>
        <SectionTitle>{t.fab.extended}</SectionTitle>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setExtended(!extended)}
            className={`h-14 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 rounded-2xl shadow-lg flex items-center gap-3 hover:shadow-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all font-medium overflow-hidden ${extended ? 'px-6' : 'w-14 justify-center'}`}
          >
            <PlusIcon className="w-6 h-6 flex-shrink-0" />
            {extended && <span className="whitespace-nowrap">{t.fab.create}</span>}
          </button>
          <button className="h-14 px-6 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-200 rounded-2xl shadow-lg flex items-center gap-3 hover:shadow-xl transition-all font-medium">
            <EditIcon className="w-5 h-5" />
            {t.button.edit}
          </button>
          <button className="h-14 px-6 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200 rounded-2xl shadow-lg flex items-center gap-3 hover:shadow-xl transition-all font-medium">
            <ShareIcon className="w-5 h-5" />
            {t.button.share}
          </button>
        </div>
      </div>

      {/* FAB Colors */}
      <div>
        <SectionTitle>{t.fab.colors}</SectionTitle>
        <div className="flex flex-wrap gap-4">
          <button className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all">
            <PlusIcon />
          </button>
          <button className="w-14 h-14 bg-green-600 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-green-700 transition-all">
            <CheckIcon className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 bg-orange-500 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all">
            <StarIcon />
          </button>
          <button className="w-14 h-14 bg-purple-600 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-purple-700 transition-all">
            <HeartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== ICON BUTTON EXAMPLE - ENHANCED =====
const IconButtonExample: React.FC<{ t: any }> = ({ t }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const toggleFav = (i: number) => setFavorites(f => f.includes(i) ? f.filter(x => x !== i) : [...f, i]);

  return (
    <div className="space-y-10">
      {/* Icon Button Types */}
      <div>
        <SectionTitle>{t.button.types}</SectionTitle>
        <div className="flex flex-wrap gap-6 items-center">
          {[
            { type: t.iconButton.standard, cls: 'text-neutral-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700' },
            { type: t.iconButton.filled, cls: 'bg-blue-600 text-white hover:bg-blue-700' },
            { type: t.iconButton.tonal, cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 hover:bg-blue-200' },
            { type: t.iconButton.outlined, cls: 'border border-neutral-400 dark:border-neutral-500 text-neutral-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-700' },
          ].map(({ type, cls }, i) => (
            <div key={i} className="text-center">
              <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${cls}`}>
                <SettingsIcon />
              </button>
              <span className="text-xs text-neutral-500 mt-2 block">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Icons */}
      <div>
        <SectionTitle>{t.iconButton.toggleIcons}</SectionTitle>
        <div className="flex flex-wrap gap-4">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => toggleFav(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${favorites.includes(i) ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' : 'text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'}`}
            >
              <HeartIcon filled={favorites.includes(i)} />
            </button>
          ))}
          {[3, 4, 5].map(i => (
            <button
              key={i}
              onClick={() => toggleFav(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${favorites.includes(i) ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400' : 'text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'}`}
            >
              <StarIcon filled={favorites.includes(i)} />
            </button>
          ))}
        </div>
      </div>

      {/* Disabled State */}
      <div>
        <SectionTitle>{t.button.disabled}</SectionTitle>
        <div className="flex flex-wrap gap-4">
          <button disabled className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-300 dark:text-neutral-600 cursor-not-allowed">
            <SettingsIcon />
          </button>
          <button disabled className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500 cursor-not-allowed">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== SEGMENTED BUTTONS EXAMPLE =====
const SegmentedButtonsExample: React.FC<{ t: any }> = ({ t }) => {
  const [selected, setSelected] = useState(0);
  const [multiSelected, setMultiSelected] = useState<number[]>([0]);
  const toggleMulti = (i: number) => setMultiSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle>{t.segmentedButton.singleSelect}</SectionTitle>
        <div className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-600 overflow-hidden">
          {[t.segmentedButton.day, t.segmentedButton.week, t.segmentedButton.month, t.segmentedButton.year].map((label, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${selected === i ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : 'text-neutral-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-700'} ${i > 0 ? 'border-l border-neutral-300 dark:border-neutral-600' : ''}`}
            >
              {selected === i && <CheckIcon className="w-4 h-4 inline mr-1" />}
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>{t.segmentedButton.multiSelect}</SectionTitle>
        <div className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-600 overflow-hidden">
          {[t.segmentedButton.songs, t.segmentedButton.albums, t.segmentedButton.podcasts].map((label, i) => (
            <button
              key={i}
              onClick={() => toggleMulti(i)}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${multiSelected.includes(i) ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : 'text-neutral-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-700'} ${i > 0 ? 'border-l border-neutral-300 dark:border-neutral-600' : ''}`}
            >
              {multiSelected.includes(i) && <CheckIcon className="w-4 h-4 inline mr-1" />}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== BADGE EXAMPLE =====
const BadgeExample: React.FC<{ t: any }> = ({ t }) => (
  <div className="flex flex-wrap gap-12 items-center">
    {[
      { label: t.badge.small, badge: <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" /> },
      { label: t.badge.large, badge: <span className="absolute -top-2 -right-3 min-w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1.5">3</span> },
      { label: t.badge.withNumber, badge: <span className="absolute -top-2 -right-4 min-w-6 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1.5">99+</span> },
    ].map(({ label, badge }, i) => (
      <div key={i} className="text-center">
        <div className="relative inline-block">
          <NotificationIcon />
          {badge}
        </div>
        <p className="text-xs text-neutral-500 mt-3">{label}</p>
      </div>
    ))}
  </div>
);

// ===== PROGRESS INDICATORS EXAMPLE - ENHANCED =====
const ProgressIndicatorsExample: React.FC<{ t: any }> = ({ t }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 1);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>{t.progress.linear} - {t.progress.determinate}</SectionTitle>
        <div className="space-y-4">
          <div className="w-full h-1 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-neutral-500 text-right">{progress}%</p>
        </div>
      </div>
      <div>
        <SectionTitle>{t.progress.linear} - {t.progress.indeterminate}</SectionTitle>
        <div className="w-full h-1 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-blue-600 rounded-full animate-[progress-indeterminate_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
      <div className="flex gap-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-xs text-neutral-500 mt-3">{t.progress.indeterminate}</p>
        </div>
        <div className="text-center">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-blue-100 dark:text-blue-900/30" />
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * progress / 100)} className="text-blue-600 transition-all duration-100" />
          </svg>
          <p className="text-xs text-neutral-500 mt-3">{t.progress.determinate}</p>
        </div>
      </div>
    </div>
  );
};

// ===== SNACKBAR EXAMPLE =====
const SnackbarExample: React.FC<{ t: any }> = ({ t }) => {
  const [snackbar, setSnackbar] = useState<number | null>(null);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => setSnackbar(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {[
          { id: 1, label: t.snackbar.singleLine },
          { id: 2, label: t.snackbar.twoLine },
          { id: 3, label: t.snackbar.withAction },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setSnackbar(id)} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-all">{label}</button>
        ))}
      </div>
      {snackbar && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-800 dark:bg-neutral-700 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-4 z-50 animate-[slide-up_0.3s_ease-out]">
          <span className={snackbar === 2 ? 'max-w-xs' : ''}>{snackbar === 2 ? t.snackbar.longMessage : t.snackbar.message}</span>
          {snackbar === 3 && <button className="text-blue-300 font-medium hover:text-blue-200">{t.snackbar.undo}</button>}
          <button onClick={() => setSnackbar(null)} className="ml-2 text-neutral-400 hover:text-white text-xl">&times;</button>
        </div>
      )}
    </div>
  );
};

// ===== CARD EXAMPLE - ENHANCED =====
const CardExample: React.FC<{ t: any }> = ({ t }) => (
  <div className="space-y-10">
    {/* Card Types */}
    <div>
      <SectionTitle>{t.button.types}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-slate-200 dark:bg-neutral-700 overflow-hidden hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors cursor-pointer">
          <img src="https://picsum.photos/400/200?random=10" alt={t.card.imageAlt} className="w-full h-36 object-cover" />
          <div className="p-4">
            <h3 className="font-medium text-lg">{t.card.filled}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{t.card.filledDesc}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-300 dark:border-neutral-600 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
          <img src="https://picsum.photos/400/200?random=11" alt={t.card.imageAlt} className="w-full h-36 object-cover" />
          <div className="p-4">
            <h3 className="font-medium text-lg">{t.card.outlined}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{t.card.outlinedDesc}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <img src="https://picsum.photos/400/200?random=12" alt={t.card.imageAlt} className="w-full h-36 object-cover" />
          <div className="p-4">
            <h3 className="font-medium text-lg">{t.card.elevated}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{t.card.elevatedDesc}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Card with Actions */}
    <div>
      <SectionTitle>{t.card.withActions}</SectionTitle>
      <div className="max-w-sm rounded-2xl border border-slate-300 dark:border-neutral-600 overflow-hidden">
        <img src="https://picsum.photos/400/200?random=13" alt={t.card.imageAlt} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-xl">{t.card.title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.card.subtitle}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-3">{t.card.description}</p>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-all">{t.card.buyNow}</button>
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 text-sm rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">{t.card.addToCart}</button>
          </div>
        </div>
      </div>
    </div>

    {/* Horizontal Card */}
    <div>
      <SectionTitle>{t.card.horizontal}</SectionTitle>
      <div className="flex rounded-2xl border border-slate-300 dark:border-neutral-600 overflow-hidden max-w-lg">
        <img src="https://picsum.photos/200/200?random=14" alt={t.card.imageAlt} className="w-32 h-32 object-cover" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="font-medium">{t.card.title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.card.subtitle}</p>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 text-left">{t.card.learnMore}</button>
        </div>
      </div>
    </div>
  </div>
);

// ===== DIALOG EXAMPLE - ENHANCED =====
const DialogExample: React.FC<{ t: any }> = ({ t }) => {
  const [dialogType, setDialogType] = useState<'basic' | 'fullscreen' | 'scrollable' | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <button onClick={() => setDialogType('basic')} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">{t.dialog.basic}</button>
        <button onClick={() => setDialogType('scrollable')} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">{t.dialog.scrollable}</button>
        <button onClick={() => setDialogType('fullscreen')} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">{t.dialog.fullscreen}</button>
      </div>

      {dialogType && (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${dialogType === 'fullscreen' ? '' : 'p-4'}`} onClick={() => setDialogType(null)}>
          <div
            className={`bg-white dark:bg-neutral-800 shadow-xl animate-[scale-in_0.2s_ease-out] ${dialogType === 'fullscreen' ? 'w-full h-full' : 'rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold">{t.dialog.title}</h3>
            </div>
            <div className={`p-6 ${dialogType === 'scrollable' ? 'overflow-y-auto flex-1' : ''}`}>
              <p className="text-neutral-600 dark:text-neutral-400">{t.dialog.content}</p>
              {dialogType === 'scrollable' && Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-neutral-600 dark:text-neutral-400 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              ))}
            </div>
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-2">
              <button onClick={() => setDialogType(null)} className="px-4 py-2 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30">{t.dialog.cancel}</button>
              <button onClick={() => setDialogType(null)} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">{t.dialog.confirm}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== BOTTOM SHEET EXAMPLE =====
const BottomSheetExample: React.FC<{ t: any }> = ({ t }) => {
  const [standardOpen, setStandardOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const shareOptions = [
    { icon: <EmailIcon />, label: t.bottomSheet.email },
    { icon: <MessageIcon />, label: t.bottomSheet.message },
    { icon: <TwitterIcon />, label: t.bottomSheet.twitter },
    { icon: <FacebookIcon />, label: t.bottomSheet.facebook },
    { icon: <LinkIcon />, label: t.bottomSheet.copyLink },
  ];

  return (
    <div className="space-y-8">
      {/* Standard Bottom Sheet */}
      <div>
        <SectionTitle>{t.bottomSheet.standard}</SectionTitle>
        <button onClick={() => setStandardOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">{t.bottomSheet.open}</button>
        {standardOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fade-in_0.2s_ease-out]" onClick={() => setStandardOpen(false)}>
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 rounded-t-3xl p-6 shadow-xl animate-[slide-up_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
              <div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-semibold mb-4">{t.navigationDrawer.mail}</h3>
              <div className="space-y-1">
                {[t.navigationDrawer.inbox, t.navigationDrawer.sent, t.navigationDrawer.drafts, t.navigationDrawer.trash].map((item, i) => (
                  <button key={i} className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 transition-colors">
                    {[<InboxIcon key="inbox" />, <SendIcon key="send" />, <DraftIcon key="draft" />, <TrashIcon key="trash" />][i]}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Bottom Sheet (Share) */}
      <div>
        <SectionTitle>{t.bottomSheet.modal}</SectionTitle>
        <button onClick={() => setShareOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">{t.bottomSheet.openModal}</button>
        {shareOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fade-in_0.2s_ease-out]" onClick={() => setShareOpen(false)}>
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 rounded-t-3xl p-6 shadow-xl animate-[slide-up_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
              <div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-semibold mb-4">{t.bottomSheet.shareVia}</h3>
              <div className="grid grid-cols-5 gap-4 mb-6">
                {shareOptions.map((option, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                      {option.icon}
                    </div>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                <button className="w-full py-3 text-center text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                  {t.bottomSheet.more}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== TOOLTIP EXAMPLE =====
const TooltipExample: React.FC<{ t: any }> = ({ t }) => (
  <div className="flex flex-wrap gap-8 items-center">
    <div className="relative group">
      <button className="px-4 py-2 bg-slate-200 dark:bg-neutral-700 rounded-lg hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors">{t.tooltip.hoverMe}</button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 dark:bg-neutral-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t.tooltip.tooltipText}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-800 dark:border-t-neutral-600" />
      </div>
    </div>
    <div className="relative group">
      <button className="px-4 py-2 bg-slate-200 dark:bg-neutral-700 rounded-lg hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors">{t.tooltip.rich}</button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 bg-white dark:bg-neutral-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity w-56 pointer-events-none group-hover:pointer-events-auto">
        <h4 className="font-medium mb-1">{t.tooltip.richTitle}</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{t.tooltip.richContent}</p>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">{t.tooltip.learnMore}</button>
      </div>
    </div>
  </div>
);

// ===== BOTTOM APP BAR EXAMPLE =====
const BottomAppBarExample: React.FC<{ t: any }> = ({ t }) => (
  <div className="space-y-6">
    <div className="relative h-20 bg-slate-200 dark:bg-neutral-700 rounded-xl overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-around px-4">
        {[<MenuIconSmall key="m" />, <SearchIconSmall key="s" />, <BookmarkIcon key="b" />, <MoreIcon key="o" />].map((icon, i) => (
          <button key={i} className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors">{icon}</button>
        ))}
      </div>
    </div>
    <div className="relative h-24 bg-slate-200 dark:bg-neutral-700 rounded-xl overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-between px-4">
        <div className="flex gap-2">
          <button className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"><MenuIconSmall /></button>
          <button className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"><SearchIconSmall /></button>
        </div>
        <button className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center -mt-4 hover:bg-blue-700 transition-all">
          <PlusIcon />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"><BookmarkIcon /></button>
          <button className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"><MoreIcon /></button>
        </div>
      </div>
    </div>
  </div>
);

// ===== NAVIGATION BAR EXAMPLE =====
const NavigationBarExample: React.FC<{ t: any }> = ({ t }) => {
  const [active, setActive] = useState(0);
  const [activeWithBadge, setActiveWithBadge] = useState(0);
  const items = [
    { icon: <HomeIcon />, label: t.navigationBar.home },
    { icon: <SearchIconSmall />, label: t.navigationBar.search },
    { icon: <HeartIcon />, label: t.navigationBar.favorites },
    { icon: <PersonIcon />, label: t.navigationBar.profile },
  ];
  const itemsWithBadge = [
    { icon: <HomeIcon />, label: t.navigationBar.home, badge: null },
    { icon: <NotificationIcon />, label: t.navigationBar.notifications, badge: 3 },
    { icon: <HeartIcon />, label: t.navigationBar.favorites, badge: 12 },
    { icon: <PersonIcon />, label: t.navigationBar.profile, badge: null },
  ];

  return (
    <div className="space-y-8">
      {/* Standard Navigation Bar */}
      <div>
        <SectionTitle>{t.navigationDrawer.standard}</SectionTitle>
        <div className="bg-blue-100 dark:bg-blue-900/50 rounded-xl">
          <div className="flex justify-around py-2">
            {items.map((item, i) => (
              <button key={i} onClick={() => setActive(i)} className="flex flex-col items-center py-2 px-6 group">
                <div className={`px-5 py-1.5 rounded-full transition-all ${active === i ? 'bg-blue-200 dark:bg-blue-800' : 'group-hover:bg-blue-200/50 dark:group-hover:bg-blue-800/50'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 transition-all ${active === i ? 'font-semibold' : ''}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Bar with Badge */}
      <div>
        <SectionTitle>{t.navigationBar.withBadge}</SectionTitle>
        <div className="bg-blue-100 dark:bg-blue-900/50 rounded-xl">
          <div className="flex justify-around py-2">
            {itemsWithBadge.map((item, i) => (
              <button key={i} onClick={() => setActiveWithBadge(i)} className="flex flex-col items-center py-2 px-6 group">
                <div className={`relative px-5 py-1.5 rounded-full transition-all ${activeWithBadge === i ? 'bg-blue-200 dark:bg-blue-800' : 'group-hover:bg-blue-200/50 dark:group-hover:bg-blue-800/50'}`}>
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">{item.badge}</span>
                  )}
                </div>
                <span className={`text-xs mt-1 transition-all ${activeWithBadge === i ? 'font-semibold' : ''}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Icon Only Navigation Bar */}
      <div>
        <SectionTitle>{t.navigationBar.iconOnly}</SectionTitle>
        <div className="bg-blue-100 dark:bg-blue-900/50 rounded-xl py-3">
          <div className="flex justify-around">
            {items.map((item, i) => (
              <button key={i} className={`p-3 rounded-full transition-all ${i === 0 ? 'bg-blue-200 dark:bg-blue-800' : 'hover:bg-blue-200/50 dark:hover:bg-blue-800/50'}`}>
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== NAVIGATION DRAWER EXAMPLE =====
const NavigationDrawerExample: React.FC<{ t: any }> = ({ t }) => {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const mailItems = [
    { icon: <InboxIcon />, label: t.navigationDrawer.inbox, badge: 24 },
    { icon: <SendIcon />, label: t.navigationDrawer.sent },
    { icon: <DraftIcon />, label: t.navigationDrawer.drafts },
    { icon: <TrashIcon />, label: t.navigationDrawer.trash },
  ];
  const labelItems = [
    { icon: <StarIcon />, label: t.navigationDrawer.starred, color: 'text-yellow-500' },
    { icon: <FlagIcon />, label: t.navigationDrawer.important, color: 'text-red-500' },
    { icon: <WarningIcon />, label: t.navigationDrawer.spam, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Standard Drawer */}
      <div>
        <SectionTitle>{t.navigationDrawer.standard}</SectionTitle>
        <div className="bg-slate-100 dark:bg-neutral-800 rounded-xl p-3 w-72">
          {/* Mail Section */}
          <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t.navigationDrawer.mail}</div>
          <div className="space-y-1">
            {mailItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-3 rounded-full transition-all flex items-center gap-3 ${active === i ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 font-medium' : 'hover:bg-slate-200 dark:hover:bg-neutral-700'}`}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">{item.badge}</span>}
              </button>
            ))}
          </div>
          {/* Divider */}
          <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />
          {/* Labels Section */}
          <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t.navigationDrawer.labels}</div>
          <div className="space-y-1">
            {labelItems.map((item, i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-3 rounded-full transition-all flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-neutral-700"
              >
                <span className={item.color}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </div>
          {/* Divider */}
          <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />
          {/* Bottom Section */}
          <div className="space-y-1">
            <button className="w-full text-left px-4 py-3 rounded-full transition-all flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-neutral-700">
              <SettingsIcon />
              <span>{t.navigationDrawer.settings}</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-full transition-all flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-neutral-700">
              <HelpIcon />
              <span>{t.navigationDrawer.help}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Drawer */}
      <div>
        <SectionTitle>{t.navigationDrawer.modal}</SectionTitle>
        <button onClick={() => setModalOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">{t.navigationDrawer.openModal}</button>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fade-in_0.2s_ease-out]" onClick={() => setModalOpen(false)}>
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-800 shadow-xl animate-[slide-right_0.3s_ease-out] p-3" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="px-4 py-4 mb-2 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold">{t.navigationDrawer.mail}</h3>
              </div>
              {/* Items */}
              <div className="space-y-1">
                {mailItems.map((item, i) => (
                  <button
                    key={i}
                    className={`w-full text-left px-4 py-3 rounded-full transition-all flex items-center gap-3 ${i === 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 font-medium' : 'hover:bg-slate-100 dark:hover:bg-neutral-700'}`}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== TABS EXAMPLE =====
const TabsExample: React.FC<{ t: any }> = ({ t }) => {
  const [primaryTab, setPrimaryTab] = useState(0);
  const [secondaryTab, setSecondaryTab] = useState(0);
  const [iconTab, setIconTab] = useState(0);
  const [scrollTab, setScrollTab] = useState(0);

  const iconTabs = [
    { icon: <MusicIcon />, label: t.tabs.music },
    { icon: <MovieIcon />, label: t.tabs.movies },
    { icon: <BookIcon />, label: t.tabs.books },
    { icon: <PodcastIcon />, label: t.tabs.podcasts },
  ];

  const scrollTabs = [t.tabs.music, t.tabs.movies, t.tabs.books, t.tabs.podcasts, t.tabs.news, t.tabs.sports];

  return (
    <div className="space-y-8">
      {/* Primary Tabs */}
      <div>
        <SectionTitle>{t.tabs.primary}</SectionTitle>
        <div className="border-b border-neutral-300 dark:border-neutral-600">
          <div className="flex">
            {[t.tabs.flights, t.tabs.trips, t.tabs.explore].map((tab, i) => (
              <button
                key={i}
                onClick={() => setPrimaryTab(i)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${primaryTab === i ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-neutral-800/50 rounded-b-xl">
          <p className="text-neutral-600 dark:text-neutral-400">{t.tabs.contentFor.replace('{tab}', [t.tabs.flights, t.tabs.trips, t.tabs.explore][primaryTab])}</p>
        </div>
      </div>

      {/* Tabs with Icons */}
      <div>
        <SectionTitle>{t.tabs.withIcons}</SectionTitle>
        <div className="border-b border-neutral-300 dark:border-neutral-600">
          <div className="flex">
            {iconTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setIconTab(i)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all flex flex-col items-center gap-1 ${iconTab === i ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Tabs */}
      <div>
        <SectionTitle>{t.tabs.scrollable}</SectionTitle>
        <div className="border-b border-neutral-300 dark:border-neutral-600 overflow-x-auto">
          <div className="flex min-w-max">
            {scrollTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setScrollTab(i)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${scrollTab === i ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Tabs */}
      <div>
        <SectionTitle>{t.tabs.secondary}</SectionTitle>
        <div className="inline-flex bg-slate-200 dark:bg-neutral-700 rounded-full p-1">
          {[t.tabs.tab1, t.tabs.tab2, t.tabs.tab3].map((tab, i) => (
            <button
              key={i}
              onClick={() => setSecondaryTab(i)}
              className={`px-6 py-2 text-sm rounded-full transition-all ${secondaryTab === i ? 'bg-white dark:bg-neutral-600 shadow font-medium' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== TOP APP BAR EXAMPLE =====
const TopAppBarExample: React.FC<{ t: any }> = ({ t }) => (
  <div className="space-y-6">
    {[
      { title: t.topAppBar.centerAligned, center: true, h: 'h-16' },
      { title: t.topAppBar.small, center: false, h: 'h-16' },
      { title: t.topAppBar.medium, center: false, h: 'h-28', large: true },
    ].map(({ title, center, h, large }, i) => (
      <div key={i} className={`bg-blue-100 dark:bg-blue-900/50 rounded-xl ${h}`}>
        {large ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center px-4 h-14 gap-4">
              <ArrowBackIcon />
              <div className="flex-1" />
              <MoreIcon />
            </div>
            <div className="px-4 pb-4 mt-auto">
              <h2 className="text-2xl font-medium">{title}</h2>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-4 h-full gap-4">
            {center ? <MenuIconSmall /> : <ArrowBackIcon />}
            <span className={`font-medium ${center ? 'flex-1 text-center' : 'flex-1'}`}>{title}</span>
            {center ? <PersonIcon /> : <MoreIcon />}
          </div>
        )}
      </div>
    ))}
  </div>
);

// ===== CHECKBOX EXAMPLE =====
const CheckboxExample: React.FC<{ t: any }> = ({ t }) => {
  const [checked, setChecked] = useState([false, true, false]);
  const [indeterminate, setIndeterminate] = useState(true);

  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean) && !allChecked;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => {
              const newVal = !allChecked;
              setChecked([newVal, newVal, newVal]);
              setIndeterminate(false);
            }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${someChecked || allChecked ? 'bg-blue-600 border-blue-600' : 'border-neutral-400 dark:border-neutral-500 hover:border-blue-600'}`}
          >
            {allChecked && <CheckIcon className="w-3 h-3 text-white" />}
            {someChecked && <MinusIcon className="w-3 h-3 text-white" />}
          </div>
          <span className="font-medium">{t.checkbox.selectAll}</span>
        </label>
        <div className="ml-6 space-y-3">
          {[t.checkbox.option1, t.checkbox.option2, t.checkbox.option3].map((label, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => {
                  const newChecked = [...checked];
                  newChecked[i] = !newChecked[i];
                  setChecked(newChecked);
                }}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked[i] ? 'bg-blue-600 border-blue-600' : 'border-neutral-400 dark:border-neutral-500 hover:border-blue-600'}`}
              >
                {checked[i] && <CheckIcon className="w-3 h-3 text-white" />}
              </div>
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== CHIPS EXAMPLE =====
const ChipsExample: React.FC<{ t: any }> = ({ t }) => {
  const [filterSelected, setFilterSelected] = useState([true, false, false]);
  const [inputChips, setInputChips] = useState([t.chips.john, t.chips.jane, t.chips.bob]);

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle>{t.chips.assist}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <CalendarIcon />, label: t.chips.addEvent },
            { icon: <LocationIcon />, label: t.chips.directions },
            { icon: <PhoneIcon />, label: t.chips.call },
          ].map(({ icon, label }, i) => (
            <button key={i} className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-2 transition-colors">
              {icon} {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>{t.chips.filter}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {[t.chips.recent, t.chips.favorites, t.chips.unread].map((label, i) => (
            <button
              key={i}
              onClick={() => {
                const newSelected = [...filterSelected];
                newSelected[i] = !newSelected[i];
                setFilterSelected(newSelected);
              }}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${filterSelected[i] ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : 'border border-neutral-300 dark:border-neutral-600 hover:bg-slate-100 dark:hover:bg-neutral-700'}`}
            >
              {filterSelected[i] && <CheckIcon className="w-4 h-4" />}
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>{t.chips.input}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {inputChips.map((name, i) => (
            <span key={i} className="pl-1 pr-3 py-1 bg-slate-200 dark:bg-neutral-700 rounded-full text-sm flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">{name[0]}</div>
              {name}
              <button onClick={() => setInputChips(c => c.filter((_, j) => j !== i))} className="hover:text-red-500 ml-1">&times;</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>{t.chips.suggestion}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {[t.chips.hiking, t.chips.cooking, t.chips.reading, t.chips.gaming].map((label, i) => (
            <button key={i} className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== DATE PICKER EXAMPLE =====
const DatePickerExample: React.FC<{ t: any }> = ({ t }) => {
  const [selectedDate, setSelectedDate] = useState(20);
  const [currentMonth] = useState(0);
  const today = 20;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl p-5 shadow-xl max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-full transition-colors"><ChevronLeftIcon /></button>
        <span className="font-semibold">{t.datePicker.january} {t.datePicker.year2026}</span>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-full transition-colors"><ChevronRightIcon /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="p-2 text-neutral-500 font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: 3 }).map((_, i) => <div key={`empty-${i}`} className="p-2" />)}
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`p-2 rounded-full transition-all ${selectedDate === day ? 'bg-blue-600 text-white' : day === today ? 'border-2 border-blue-600 text-blue-600' : 'hover:bg-slate-100 dark:hover:bg-neutral-700'}`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-2">
        <button className="px-4 py-2 text-blue-600 dark:text-blue-400 text-sm rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30">{t.dialog.cancel}</button>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700">{t.dialog.confirm}</button>
      </div>
    </div>
  );
};

// ===== MENUS EXAMPLE =====
const MenusExample: React.FC<{ t: any }> = ({ t }) => {
  const [contextOpen, setContextOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Context Menu */}
      <div>
        <SectionTitle>{t.menus.contextMenu}</SectionTitle>
        <div className="relative inline-block">
          <button onClick={() => setContextOpen(!contextOpen)} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-all">
            {t.menus.open}
          </button>
          {contextOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setContextOpen(false)} />
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl py-2 min-w-48 z-50 animate-[scale-in_0.15s_ease-out]">
                {[
                  { icon: <CutIcon />, label: t.menus.cut, shortcut: '⌘X' },
                  { icon: <CopyIcon />, label: t.menus.copy, shortcut: '⌘C' },
                  { icon: <PasteIcon />, label: t.menus.paste, shortcut: '⌘V' },
                ].map(({ icon, label, shortcut }, i) => (
                  <button key={i} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 transition-colors">
                    {icon}
                    <span className="flex-1">{label}</span>
                    <span className="text-xs text-neutral-400">{shortcut}</span>
                  </button>
                ))}
                <div className="my-2 border-t border-neutral-200 dark:border-neutral-700" />
                <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 text-red-600 dark:text-red-400 transition-colors">
                  <TrashIcon />
                  {t.button.delete}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dropdown Menu with Submenu */}
      <div>
        <SectionTitle>{t.menus.dropdownMenu}</SectionTitle>
        <div className="relative inline-block">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-4 py-2 bg-slate-200 dark:bg-neutral-700 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-neutral-600 transition-all flex items-center gap-2">
            {t.menus.open}
            <ChevronDownIcon />
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => { setDropdownOpen(false); setExportOpen(false); }} />
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl py-2 min-w-48 z-50 animate-[scale-in_0.15s_ease-out]">
                <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 transition-colors">
                  <ShareIcon />
                  <span>{t.menus.share}</span>
                </button>
                <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 transition-colors">
                  <DownloadIcon />
                  <span>{t.menus.download}</span>
                </button>
                <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 transition-colors">
                  <PrintIcon />
                  <span>{t.menus.print}</span>
                </button>
                <div className="my-2 border-t border-neutral-200 dark:border-neutral-700" />
                {/* Submenu trigger */}
                <div className="relative">
                  <button
                    onClick={() => setExportOpen(!exportOpen)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-3 transition-colors"
                  >
                    <span className="flex-1">{t.menus.export}</span>
                    <ChevronRightIcon />
                  </button>
                  {/* Submenu */}
                  {exportOpen && (
                    <div className="absolute left-full top-0 ml-1 bg-white dark:bg-neutral-800 rounded-xl shadow-xl py-2 min-w-36 z-50 animate-[scale-in_0.15s_ease-out]">
                      <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors">
                        {t.menus.toPdf}
                      </button>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors">
                        {t.menus.toWord}
                      </button>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors">
                        {t.menus.toExcel}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== RADIO BUTTON EXAMPLE =====
const RadioButtonExample: React.FC<{ t: any }> = ({ t }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {[t.radioButton.option1, t.radioButton.option2, t.radioButton.option3].map((label, i) => (
        <label key={i} className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => setSelected(i)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selected === i ? 'border-blue-600' : 'border-neutral-400 dark:border-neutral-500 group-hover:border-blue-600'}`}
          >
            {selected === i && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
          </div>
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

// ===== SLIDER EXAMPLE - ENHANCED =====
const SliderExample: React.FC<{ t: any }> = ({ t }) => {
  const [value, setValue] = useState(50);
  const [discrete, setDiscrete] = useState(3);
  const [rangeMin, setRangeMin] = useState(20);
  const [rangeMax, setRangeMax] = useState(80);

  return (
    <div className="space-y-10 max-w-md">
      {/* Continuous Slider */}
      <div>
        <SectionTitle>{t.slider.continuous}</SectionTitle>
        <div className="relative pt-6">
          <div className="absolute top-0 left-0 text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded" style={{ left: `calc(${value}% - 16px)` }}>{value}</div>
          <input type="range" min="0" max="100" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full h-1 bg-blue-200 dark:bg-blue-900/50 rounded-full appearance-none cursor-pointer accent-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg" />
        </div>
      </div>

      {/* Discrete Slider */}
      <div>
        <SectionTitle>{t.slider.discrete}</SectionTitle>
        <input type="range" min="1" max="5" step="1" value={discrete} onChange={e => setDiscrete(Number(e.target.value))} className="w-full h-1 bg-blue-200 dark:bg-blue-900/50 rounded-full appearance-none cursor-pointer accent-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg" />
        <div className="flex justify-between text-xs text-neutral-500 mt-2">
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} className={discrete === n ? 'text-blue-600 font-semibold' : ''}>{n}</span>
          ))}
        </div>
      </div>

      {/* Range Slider */}
      <div>
        <SectionTitle>{t.slider.rangeSlider}</SectionTitle>
        <div className="mb-2 flex justify-between text-sm">
          <span>{t.slider.priceRange}</span>
          <span className="font-medium">${rangeMin} - ${rangeMax}</span>
        </div>
        <div className="relative h-1 bg-blue-200 dark:bg-blue-900/50 rounded-full">
          {/* Active range bar */}
          <div
            className="absolute h-full bg-blue-600 rounded-full"
            style={{ left: `${rangeMin}%`, width: `${rangeMax - rangeMin}%` }}
          />
          {/* Min thumb */}
          <input
            type="range"
            min="0"
            max="100"
            value={rangeMin}
            onChange={e => {
              const val = Math.min(Number(e.target.value), rangeMax - 10);
              setRangeMin(val);
            }}
            className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
          />
          {/* Max thumb */}
          <input
            type="range"
            min="0"
            max="100"
            value={rangeMax}
            onChange={e => {
              const val = Math.max(Number(e.target.value), rangeMin + 10);
              setRangeMax(val);
            }}
            className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-500 mt-2">
          <span>{t.slider.min}: $0</span>
          <span>{t.slider.max}: $100</span>
        </div>
      </div>
    </div>
  );
};

// ===== SWITCH EXAMPLE =====
const SwitchExample: React.FC<{ t: any }> = ({ t }) => {
  const [switches, setSwitches] = useState({ wifi: true, bluetooth: false, airplane: false, notifications: true });
  const [iconSwitches, setIconSwitches] = useState({ darkMode: false, locationServices: true });

  const switchLabels: { [key: string]: string } = {
    wifi: t.switchComp.wifi,
    bluetooth: t.switchComp.bluetooth,
    airplane: t.switchComp.airplane,
    notifications: t.switchComp.notifications,
  };

  const iconSwitchLabels: { [key: string]: string } = {
    darkMode: t.switchComp.darkMode,
    locationServices: t.switchComp.locationServices,
  };

  return (
    <div className="space-y-8 max-w-sm">
      {/* Standard Switch */}
      <div>
        <SectionTitle>{t.switchComp.standard}</SectionTitle>
        <div className="space-y-4">
          {Object.entries(switches).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span>{switchLabels[key]}</span>
              <button
                onClick={() => setSwitches(s => ({ ...s, [key]: !value }))}
                className={`w-14 h-8 rounded-full p-1 transition-all ${value ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-600'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Switch with Icon */}
      <div>
        <SectionTitle>{t.switchComp.withIconSwitch}</SectionTitle>
        <div className="space-y-4">
          {Object.entries(iconSwitches).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {key === 'darkMode' ? <MoonIconSmall /> : <LocationPinIcon />}
                <span>{iconSwitchLabels[key]}</span>
              </div>
              <button
                onClick={() => setIconSwitches(s => ({ ...s, [key]: !value }))}
                className={`w-14 h-8 rounded-full p-1 transition-all ${value ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-600'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform flex items-center justify-center ${value ? 'translate-x-6' : 'translate-x-0'}`}>
                  {value && <CheckIcon className="w-3 h-3 text-blue-600" />}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Disabled Switch */}
      <div>
        <SectionTitle>{t.button.disabled}</SectionTitle>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 opacity-50">
            <span>{t.switchComp.wifi}</span>
            <button disabled className="w-14 h-8 rounded-full p-1 bg-blue-400 cursor-not-allowed">
              <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-6" />
            </button>
          </div>
          <div className="flex items-center justify-between py-2 opacity-50">
            <span>{t.switchComp.bluetooth}</span>
            <button disabled className="w-14 h-8 rounded-full p-1 bg-neutral-300 dark:bg-neutral-600 cursor-not-allowed">
              <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== TEXT FIELD EXAMPLE - ENHANCED =====
const TextFieldExample: React.FC<{ t: any }> = ({ t }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const maxLength = 100;

  return (
    <div className="space-y-8 max-w-md">
      <div>
        <SectionTitle>{t.textField.filled}</SectionTitle>
        <div className={`bg-slate-200 dark:bg-neutral-700 rounded-t-lg border-b-2 ${error ? 'border-red-500' : 'border-blue-600'} transition-colors`}>
          <label className={`block px-4 pt-2 text-xs ${error ? 'text-red-500' : 'text-blue-600'}`}>{t.textField.label}</label>
          <input
            type="text"
            value={text}
            onChange={e => { setText(e.target.value); setError(e.target.value.length > maxLength); }}
            placeholder={t.textField.placeholder}
            className="w-full px-4 pb-2 bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-between px-4 mt-1">
          <p className={`text-xs ${error ? 'text-red-500' : 'text-neutral-500'}`}>{error ? t.textField.errorText : t.textField.helperText}</p>
          <p className={`text-xs ${text.length > maxLength ? 'text-red-500' : 'text-neutral-500'}`}>{text.length}/{maxLength}</p>
        </div>
      </div>

      <div>
        <SectionTitle>{t.textField.outlined}</SectionTitle>
        <div className="relative">
          <input type="email" placeholder=" " className="peer w-full px-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:outline-none focus:border-blue-600 transition-colors" />
          <label className="absolute left-3 top-3 text-neutral-500 bg-slate-50 dark:bg-neutral-900 px-1 transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs">{t.textField.email}</label>
        </div>
      </div>

      <div>
        <SectionTitle>{t.textField.withIcon}</SectionTitle>
        <div className="relative">
          <SearchIconSmall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          <input type="text" placeholder={t.textField.search} className="w-full pl-10 pr-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-full bg-transparent focus:outline-none focus:border-blue-600 transition-colors" />
        </div>
      </div>

      <div>
        <SectionTitle>{t.textField.multiline}</SectionTitle>
        <textarea rows={4} placeholder={t.textField.placeholder} className="w-full px-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:outline-none focus:border-blue-600 transition-colors resize-none" />
      </div>
    </div>
  );
};

// ===== ICONS =====
const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
);
const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
);
const MinusIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
);
const SettingsIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const NotificationIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
const MenuIconSmall: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const SearchIconSmall: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const BookmarkIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
);
const MoreIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
);
const HomeIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const HeartIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg className="w-6 h-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const StarIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg className="w-6 h-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
);
const PersonIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const ArrowBackIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
);
const SendIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
);
const EditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);
const ShareIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);
const InboxIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
);
const DraftIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const CalendarIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const LocationIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const PhoneIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const CutIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
);
const CopyIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const PasteIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
);
const ChevronLeftIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);
const ChevronRightIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);
const FlagIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
);
const WarningIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const HelpIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const MusicIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
);
const MovieIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
);
const BookIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const PodcastIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);
const EmailIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const MessageIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);
const LinkIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);
const DownloadIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);
const PrintIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
);
const ChevronDownIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);
const MoonIconSmall: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
);
const LocationPinIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const TwitterIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const FacebookIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const ListIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
);
const GridIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
);
const InfoIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const HomeIconComponent: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const SearchIconComponent: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const MenuIconComponent: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const LinkIconComponent: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);
export default ComponentPage;
