import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { useTasks } from "../contexts/tasks";

const Tasks = () => {
  const { tasks, addTask, updateTask, removeTask } = useTasks();

  return (
    <View style={styles.container}>
      <Text>Tasks</Text>

      <Text>{JSON.stringify(tasks)}</Text>
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
