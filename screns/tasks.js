import React, { useState } from "react";

import { Dimensions, FlatList, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Animated } from "react-native";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import Header from "../components/header";

import NoTask from "../components/noTask";

import Task from "../components/task";

import NewTaskButton from "../components/newTaskButton";

import NewTask from "../components/newTask";

const Tasks = () => {
  const { tasks } = useTasks();

  const newTaskTranslateY = useState(
    new Animated.Value(Dimensions.get("window").height)
  )[0];

  const showNewTask = () =>
    Animated.timing(newTaskTranslateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

  const hideNewTask = () =>
    Animated.timing(newTaskTranslateY, {
      toValue: Dimensions.get("window").height,
      duration: 250,
      useNativeDriver: true,
    }).start();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

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

      <NewTask
        newTaskTranslateY={newTaskTranslateY}
        hideNewTask={hideNewTask}
      />

      <NewTaskButton showNewTask={showNewTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 8,
    backgroundColor: theme.color.white.main,
  },
  flatList: {
    width: "95%",
  },
});

export default Tasks;
