import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        sidebarOpen,
        toggleSidebar,
        notifications,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
