import React from "react";

import { FlatList, StyleSheet } from "react-native";

import { useTasks } from "../contexts/tasks";

import Task from "./task";

const Tasks = () => {
  const { tasks } = useTasks();

  return (
    <FlatList
      data={tasks}
      renderItem={({ item, index }) => <Task task={item} />}
      keyExtractor={(item, index) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: "95%",
  },
});

export default Tasks;
