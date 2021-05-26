import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const NoTask = () => {
  const { isDark } = useSettings();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="emoji-flags"
        size={68}
        color={isDark ? theme.color.white.main : theme.color.black.main}
      />

      <Text
        style={[styles.text, isDark ? { color: theme.color.white.main } : {}]}
      >
        You don't have any goals
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 32,
  },
  text: {
    maxWidth: "55%",
    color: theme.color.black.main,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginTop: 15,
    textAlign: "center",
  },
});

export default NoTask;
