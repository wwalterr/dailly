import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Tasks from "./screns/tasks";

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
      <Stack.Screen name="Tasks" component={Tasks} />
    </Stack.Navigator>
  );
};

export default Routes;
