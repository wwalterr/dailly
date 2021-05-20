import React, { createContext, useState, useContext, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "Settings";

const defaultSettings = {
  theme: "light",
};

const SettingsContext = createContext(defaultSettings);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    (async () => {
      const _settings = await AsyncStorage.getItem(key);

      if (_settings) setSettings(JSON.parse(_settings));
    })();
  }, []);

  const updateSettings = async (setting) => {
    const _settings = { ...settings, ...setting };

    setSettings(_settings);

    await AsyncStorage.setItem(key, JSON.stringify(_settings));
  };

  const resetSettings = async () => {
    setSettings(defaultSettings);

    await AsyncStorage.setItem(key, JSON.stringify(defaultSettings));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettings must be used within an SettingsProvider");

  return context;
};

export { SettingsProvider, useSettings };
