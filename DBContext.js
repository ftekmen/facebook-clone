import { createContext, useMemo, useState } from 'react';

export const DBContext = createContext();

export default function DBProvider({ children }) {
  const [update, setUpdate] = useState('run!');

  function toggleUpdate() {
    console.log('toggle update');
    setUpdate(prevUpdate => prevUpdate === 'run!' ? 'run!!' : 'run!');
  }

  const value = useMemo(() => ({update, toggleUpdate}), [update, toggleUpdate]);

  return (
    <DBContext.Provider value={value}>
      {children}
    </DBContext.Provider>
  );
}