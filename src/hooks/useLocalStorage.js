import { useState } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setAndPersist = (newValue) => {
    const valToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valToStore);
    try {
      localStorage.setItem(key, JSON.stringify(valToStore));
    } catch (error) {
      console.error('localStorage error:', error);
    }
  };

  return [value, setAndPersist];
}
