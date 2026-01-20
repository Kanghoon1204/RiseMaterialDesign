
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NAV_DATA } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../i18n/translations';

const ComponentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = useTranslation(language);

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

  return (
    <div className="container mx-auto max-w-5xl p-8 lg:p-12">
      <div className="mb-8">
        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{t.componentPage.components}</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-1">{componentName}</h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl">
          {t.componentPage.placeholder.replace('{name}', componentName)}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">{t.componentPage.example}</h2>
        <div className="p-8 border border-slate-200 dark:border-neutral-700 rounded-2xl bg-slate-100/50 dark:bg-neutral-800/50">
          {renderComponentExample()}
        </div>
      </div>

      <div className="mt-12 prose prose-lg dark:prose-invert max-w-none prose-p:text-neutral-600 dark:prose-p:text-neutral-300 prose-headings:font-bold">
        <h2 className="text-2xl font-semibold">{t.componentPage.usage}</h2>
        <p>{t.componentPage.usageDesc.replace('{name}', componentName)}</p>
        <p>{t.componentPage.usageExample}</p>
      </div>
    </div>
  );
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

export default ComponentPage;
