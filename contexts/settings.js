import React, { createContext, useState, useContext, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "Settings";

const defaultSettings = {
  theme: "light", // Define the theme. Options: light or dark
  history: false, // Define if completed goals should be shown. Options: true or false
  card: false, // Define the goal card mode. Options: true or false
};

const SettingsContext = createContext(defaultSettings);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const [isDark, setIsDark] = useState(settings.theme === "dark");

  useEffect(() => {
    setIsDark(settings.theme === "dark");
  }, [settings, setSettings]);

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
        isDark,
        setIsDark,
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
