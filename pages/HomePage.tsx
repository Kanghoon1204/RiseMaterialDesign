
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl p-8 lg:p-12 text-neutral-800 dark:text-neutral-200">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 mb-4">
          Material Design 3
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl">
          This is a clone of the Material Design 3 components website, built to showcase a modern frontend stack with React, TypeScript, and Tailwind CSS. Explore the components using the sidebar navigation.
        </p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">Explore Components</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Dive into a variety of UI components, each styled to match the M3 aesthetic.
          </p>
          <Link to="/components/button" className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Go to Buttons <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">Responsive Design</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The layout is fully responsive, adapting seamlessly from mobile to desktop screens.
          </p>
        </div>
        
        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">Light & Dark Modes</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Toggle between light and dark themes using the icon in the top bar.
          </p>
        </div>
        
        <div className="bg-slate-100 dark:bg-neutral-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">Built with Tailwind</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            All styles are implemented using Tailwind CSS for a utility-first and maintainable codebase.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
