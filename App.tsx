
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ComponentPage from './pages/ComponentPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="components/:id" element={<ComponentPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
