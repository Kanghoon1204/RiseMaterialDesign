
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Page Not Found</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link 
        to="/home" 
        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
