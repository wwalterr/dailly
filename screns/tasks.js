import React from "react";

import { View, Text, StyleSheet } from "react-native";

import Emoji from "react-native-emoji";

import { useTasks } from "../contexts/tasks";

import emojis from "../utils/emojis";

const Tasks = () => {
  const { tasks, addTask, updateTask, removeTask } = useTasks();

  return (
    <View style={styles.container}>
      <Text>Tasks</Text>

      <Text>{JSON.stringify(tasks)}</Text>

      <Emoji name={emojis[0].aliases} style={{ fontSize: 50 }} />
    </View>
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

export default Tasks;
