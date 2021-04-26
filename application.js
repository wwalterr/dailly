import React from "react";

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";

import { registerRootComponent } from "expo";

import { TasksProvider } from "./contexts/tasks";

import Routes from "./routes";

const Application = () => {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_900Black,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <TasksProvider>
        <Routes />
      </TasksProvider>
    </NavigationContainer>
  );
};

export default registerRootComponent(Application);
