import { createContext, useState } from 'react';

export const DBContext = createContext();

export default function DBProvider({ children }) {
  const [update, setUpdate] = useState('run!');

  function toggleUpdate() {
    console.log('toggle update');
    setUpdate(prevUpdate => prevUpdate === 'run!' ? 'run!!' : 'run!');
  }

  return (
    <DBContext.Provider value={{ update, toggleUpdate }}>
      {children}
    </DBContext.Provider>
  );
}