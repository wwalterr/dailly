import React, { useState } from "react";

import { FlatList, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import Header from "../components/header";

import NoTask from "../components/noTask";

import Task from "../components/task";

import NewTaskButton from "../components/newTaskButton";

import NewTask from "../components/newTask";

const Tasks = () => {
  const { tasks } = useTasks();

  const [newTaskVisible, setNewTaskVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header setNewTaskVisible={setNewTaskVisible} />

      {tasks.length ? (
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => <Task task={item} />}
          keyExtractor={(item, index) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.flatList}
        />
      ) : (
        <NoTask />
      )}

      {newTaskVisible ? (
        <NewTask setNewTaskVisible={setNewTaskVisible} />
      ) : null}

      {!newTaskVisible ? (
        <NewTaskButton setNewTaskVisible={setNewTaskVisible} />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: theme.color.white.main,
  },
  flatList: {
    width: "100%",
  },
});

export default Tasks;
