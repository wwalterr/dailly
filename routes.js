import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";

import { useSettings } from "./contexts/settings";

import TasksScreen from "./screns/tasks";

import UpdateScreen from "./screns/update";

import ContactScreen from "./screns/contact";

import SettingsScreen from "./screns/settings";

const Stack = createStackNavigator();

const Routes = () => {
  const { isDark } = useSettings();

  if (isDark) {
    StatusBar.setBarStyle("light-content", true);
  } else {
    StatusBar.setBarStyle("dark-content", true);
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tasks" component={TasksScreen} />

      <Stack.Screen name="Update" component={UpdateScreen} />

      <Stack.Screen name="Contact" component={ContactScreen} />

      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
