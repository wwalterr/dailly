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

const messageCard = "Complete";

const CompleteSetting = () => {
  const { settings, isDark, updateSettings } = useSettings();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          updateSettings({
            complete: !settings.complete,
          });

          if (Platform.OS === "android")
            ToastAndroid.show(
              `${messageCard} ${!settings.complete ? "enabled" : "disabled"}`,
              ToastAndroid.SHORT
            );
        }}
        activeOpacity={0.8}
        style={[
          styles.buttonImage,
          {
            backgroundColor: settings.complete
              ? theme.color.green.main
              : isDark
              ? theme.color.black.light
              : theme.color.black.main,
          },
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/settings/checked.png")}
        />
      </TouchableOpacity>

      <View style={styles.containerContent}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Complete
        </Text>

        <Text style={styles.description}>Remove goals when complete</Text>
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
    marginTop: 32,
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

export default CompleteSetting;
