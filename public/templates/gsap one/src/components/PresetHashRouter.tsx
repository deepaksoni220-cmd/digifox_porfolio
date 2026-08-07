import React, { useState, useEffect } from 'react';

interface PresetHashRouterProps {
  routes: Record<string, React.ReactNode>;
}

export const PresetHashRouter: React.FC<PresetHashRouterProps> = ({ routes }) => {
  const [currentHash, setCurrentHash] = useState(window.location.hash.replace('#', ''));

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.replace('#', ''));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const cleanHash = currentHash.split('?')[0]; // Strip query params
  const currentRoute = routes[cleanHash] || routes[''] || null;

  return <>{currentRoute}</>;
};
