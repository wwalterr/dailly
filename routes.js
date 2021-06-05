import React from "react";

import { StatusBar } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { useSettings } from "./contexts/settings";

import TasksScreen from "./screns/tasks";

import UpdateScreen from "./screns/update";

import ContactScreen from "./screns/contact";

import BackupScreen from "./screns/backup";

import SettingsScreen from "./screns/settings";

const Stack = createStackNavigator();

const Routes = () => {
  const { isDark } = useSettings();

  return (
    <>
      {isDark ? (
        <StatusBar backgroundColor="black" barStyle="light-content" />
      ) : (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Tasks" component={TasksScreen} />

        <Stack.Screen name="Update" component={UpdateScreen} />

        <Stack.Screen name="Contact" component={ContactScreen} />

        <Stack.Screen name="Backup" component={BackupScreen} />

        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </>
  );
};

export default Routes;
