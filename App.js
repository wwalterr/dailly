import React, { useState, useRef, useEffect } from "react";

import { Platform } from "react-native";

import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import {
  Maitree_200ExtraLight,
  Maitree_300Light,
  Maitree_400Regular,
  Maitree_500Medium,
  Maitree_600SemiBold,
  Maitree_700Bold,
} from "@expo-google-fonts/maitree";

import {
  Oxanium_200ExtraLight,
  Oxanium_300Light,
  Oxanium_400Regular,
  Oxanium_500Medium,
  Oxanium_600SemiBold,
  Oxanium_700Bold,
  Oxanium_800ExtraBold,
} from "@expo-google-fonts/oxanium";

import {
  DMMono_300Light,
  DMMono_300Light_Italic,
  DMMono_400Regular,
  DMMono_400Regular_Italic,
  DMMono_500Medium,
  DMMono_500Medium_Italic,
} from "@expo-google-fonts/dm-mono";

import AppLoading from "expo-app-loading";

import { enableScreens } from "react-native-screens";

import { NavigationContainer } from "@react-navigation/native";

import theme from "./theme";

import { SettingsProvider } from "./contexts/settings";

import { TasksProvider } from "./contexts/tasks";

import Routes from "./routes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification");

      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for push notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: theme.color.black.main,
    });
  }

  return token;
};

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  const notificationListener = useRef();

  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );

      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Add the new fonts here and in the theme
  const [fontsLoaded] = useFonts({
    // Inter
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    // Maitree
    Maitree_200ExtraLight,
    Maitree_300Light,
    Maitree_400Regular,
    Maitree_500Medium,
    Maitree_600SemiBold,
    Maitree_700Bold,
    // Oxanium
    Oxanium_200ExtraLight,
    Oxanium_300Light,
    Oxanium_400Regular,
    Oxanium_500Medium,
    Oxanium_600SemiBold,
    Oxanium_700Bold,
    Oxanium_800ExtraBold,
    // Mono
    DMMono_300Light,
    DMMono_300Light_Italic,
    DMMono_400Regular,
    DMMono_400Regular_Italic,
    DMMono_500Medium,
    DMMono_500Medium_Italic,
  });

  if (!fontsLoaded) return <AppLoading />;

  enableScreens();

  return (
    <NavigationContainer>
      <SettingsProvider>
        <TasksProvider>
          <Routes />
        </TasksProvider>
      </SettingsProvider>
    </NavigationContainer>
  );
};

export default App;
