import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sellio_saved_opportunities';

export const useSavedOpportunities = () => {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : ['opp_1'];
    } catch {
      return ['opp_1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [savedIds]);

  const toggleSave = (oppId) => {
    setSavedIds(prev => 
      prev.includes(oppId) ? prev.filter(id => id !== oppId) : [...prev, oppId]
    );
  };

  const isSaved = (oppId) => savedIds.includes(oppId);

  return {
    savedIds,
    toggleSave,
    isSaved,
    savedCount: savedIds.length
  };
};

export default useSavedOpportunities;
