import React from "react";

import { View, StyleSheet } from "react-native";

import { registerRootComponent } from "expo";

import Tasks from "./screns/tasks";

import { TasksProvider } from "./contexts/tasks";

const Application = () => {
  return (
    <TasksProvider>
      <View style={styles.container}>
        <Tasks />
      </View>
    </TasksProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d6d7",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(Application);
