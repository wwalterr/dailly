import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import TasksScreen from "./screns/tasks";

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
    </Stack.Navigator>
  );
};

export default Routes;
