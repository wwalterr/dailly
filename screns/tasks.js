import React, { useRef } from "react";

import { Dimensions, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Animated } from "react-native";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import Header from "../components/header";

import Tasks from "../components/tasks";

import NoTask from "../components/noTask";

import NewTaskButton from "../components/newTaskButton";

import NewTask from "../components/newTask";

const TasksScreen = ({ navigation }) => {
  const { tasks } = useTasks();

  const newTaskTranslateY = new Animated.Value(Dimensions.get("window").height);

  const showNewTask = () =>
    Animated.timing(newTaskTranslateY, {
      toValue: 0,
      duration: 350,
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
      <Header
        newTaskButton={<NewTaskButton showNewTask={showNewTask} />}
        navigation={navigation}
      />

      {tasks.length ? <Tasks navigation={navigation} /> : <NoTask />}

      <NewTask
        newTaskTranslateY={newTaskTranslateY}
        hideNewTask={hideNewTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: theme.color.white.main,
  },
});

export default TasksScreen;
