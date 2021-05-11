import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import TasksScreen from "./screns/tasks";

import TaskUpdateScreen from "./screns/taskUpdate";

import ContactScreen from "./screns/contact";

import { useTasks } from "./contexts/tasks";

const Stack = createStackNavigator();

const Routes = () => {
  const { startTasks } = useTasks();

  useEffect(() => {
    (async () => {
      startTasks();
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tasks" component={TasksScreen} />

      <Stack.Screen name="Update Task" component={TaskUpdateScreen} />

      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
