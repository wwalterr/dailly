import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";

import { useSettings } from "./contexts/settings";

import TasksScreen from "./screns/tasks";

import UpdateScreen from "./screns/update";

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

        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </>
  );
};

export default Routes;
