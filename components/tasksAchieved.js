import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const defaultMessage = "All goals completed!";

const messages = [
  {
    uri: "https://media.giphy.com/media/ZO8ZYFEnvIfrEF6AAZ/giphy.gif",
    text: "Your resilience it's over 9000!",
  },
];

const TasksAchieved = () => {
  const { isDark } = useSettings();

  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: message.uri }}
        style={[
          styles.image,
          isDark ? { overlayColor: theme.color.black.main } : {},
        ]}
      />

      <Text
        style={[styles.text, isDark ? { color: theme.color.white.main } : {}]}
      >
        {defaultMessage} {message.text}
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
    marginBottom: 16,
    overlayColor: theme.color.white.main,
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
