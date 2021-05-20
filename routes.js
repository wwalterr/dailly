import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import TasksScreen from "./screns/tasks";

import UpdateScreen from "./screns/update";

import ContactScreen from "./screns/contact";

import SettingsScreen from "./screns/settings";

const Stack = createStackNavigator();

const Routes = () => (
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

export default Routes;
