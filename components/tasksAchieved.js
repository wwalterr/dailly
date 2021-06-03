import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const defaultMessage = "All goals 100% completed";

const TasksAchieved = () => {
  const { isDark } = useSettings();

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require("../assets/tasks/mobPsycho.gif")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

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
  containerImage: {
    width: 95,
    height: 185,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    justifyContent: "center",
    alignSelf: "center",
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
