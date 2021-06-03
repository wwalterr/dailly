import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const defaultMessage = "All goals 100% completed";

const TasksAchieved = () => {
  const { isDark } = useSettings();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/tasks/mobPsycho.gif")}
		fadeDuration={100}
        style={[
          styles.image,
          isDark
            ? {
                overlayColor: theme.color.black.main,
                borderColor: theme.color.black.main,
              }
            : {},
        ]}
      />

      <Text
        style={[styles.text, isDark ? { color: theme.color.white.main } : {}]}
      >
        {defaultMessage}
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
  image: {
    width: 95,
    height: 185,
    borderRadius: 1000,
    marginBottom: 20,
    overlayColor: theme.color.white.main,
    borderColor: theme.color.white.main,
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

export default TasksAchieved;
