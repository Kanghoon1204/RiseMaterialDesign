
import React from 'react';
import { useParams } from 'react-router-dom';
import { NAV_DATA } from '../constants';
import type { NavItem } from '../types';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ComponentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const componentItem = NAV_DATA.flatMap(category => category.items).find(
    item => item.path === `/components/${id}`
  );

  const componentName = componentItem ? componentItem.name : "Component";

  const renderComponentExample = () => {
    switch(id) {
      case 'button':
        return (
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Filled</button>
            <button className="px-6 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm leading-tight uppercase rounded-full border border-blue-600 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Outlined</button>
            <button className="px-6 py-2.5 text-blue-600 dark:text-blue-300 font-medium text-sm leading-tight uppercase rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Text</button>
          </div>
        );
      case 'card':
         return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
                <img src="https://picsum.photos/400/250" alt="Card image" className="w-full" />
                <div className="p-4">
                    <h3 className="font-medium text-lg">Filled Card</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">A card with a solid background color.</p>
                </div>
            </div>
            <div className="rounded-2xl border border-slate-300 dark:border-neutral-600 overflow-hidden bg-transparent">
                <img src="https://picsum.photos/400/250?grayscale" alt="Card image" className="w-full" />
                <div className="p-4">
                    <h3 className="font-medium text-lg">Outlined Card</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">A card with a visible border.</p>
                </div>
            </div>
          </div>
         );
      default:
        return <p className="text-neutral-500">No example available for this component.</p>;
    }
  }

  return (
    <div className="container mx-auto max-w-5xl p-8 lg:p-12">
      <div className="mb-8">
        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Components</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-1">{componentName}</h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl">
          This is a placeholder page for the {componentName} component. Below is a live, interactive example of how the component might look.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Example</h2>
        <div className="p-8 border border-slate-200 dark:border-neutral-700 rounded-2xl bg-slate-100/50 dark:bg-neutral-800/50">
          {renderComponentExample()}
        </div>
      </div>

      <div className="mt-12 prose prose-lg dark:prose-invert max-w-none prose-p:text-neutral-600 dark:prose-p:text-neutral-300 prose-headings:font-bold">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <p>
          Component documentation would go here, explaining how to implement and customize the {componentName}. This section would typically include details about props, state management, and accessibility best practices.
        </p>
        <p>
          For example, when discussing buttons, one might cover the different types (filled, outlined, text), how to handle click events, and when to use an icon versus text.
        </p>
      </div>
    </div>
  );
};

export default ComponentPage;
