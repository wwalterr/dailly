import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const messageTheme = "Dark theme";

const ThemeSetting = () => {
  const { settings, updateSettings, isDark } = useSettings();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          updateSettings({
            theme: isDark ? "light" : "dark",
          });

          if (Platform.OS === "android")
            ToastAndroid.show(
              `${messageTheme} ${isDark ? "disabled" : "enabled"} !`,
              ToastAndroid.SHORT
            );
        }}
        activeOpacity={0.8}
        style={[
          styles.buttonImage,
          {
            backgroundColor:
              settings.theme === "light"
                ? theme.color.black.main
                : theme.color.green.main,
          },
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/settings/light.png")}
        />
      </TouchableOpacity>

      <View style={styles.containerContent}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Theme
        </Text>

        <Text style={styles.description}>
          Enable dark theme to reduce eye strain
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    marginTop: 16,
  },
  buttonImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: theme.color.black.main,
  },
  image: {
    width: 25,
    height: 25,
  },
  containerContent: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: theme.color.black.main,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.gray.main,
  },
});

export default ThemeSetting;
