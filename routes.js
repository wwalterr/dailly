import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { useTasks } from "./contexts/tasks";

import TasksScreen from "./screns/tasks";

import UpdateScreen from "./screns/taskUpdate";

import ContactScreen from "./screns/contact";

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
  </Stack.Navigator>
);

export default Routes;
