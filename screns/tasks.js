import React, { useRef, useEffect, useState } from "react";

import { Dimensions, StyleSheet } from "react-native";

import { Animated } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import Header from "../components/header";

import Tasks from "../components/tasks";

import NoTask from "../components/noTask";

import NewTask from "../components/newTask";

import TasksAchieved from "../components/tasksAchieved";

const TasksScreen = ({ navigation }) => {
  const { settings, isDark } = useSettings();

  const { tasks } = useTasks();

  const [showModalBackground, setShowModalBackground] = useState(false);

  const newTaskTranslateY = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

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

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    newTaskTranslateY.addListener((value) => {
      if (value.value === 0) setShowModalBackground(true);
      else {
        setShowModalBackground(false);
      }

      // Optimized version for the else statement
      //   if (value.value === Dimensions.get("window").height)
      //     setShowModalBackground(false);
    });

    return () => {
      newTaskTranslateY.removeAllListeners();
    };
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark
          ? {
              backgroundColor: theme.color.black.main,
            }
          : {},
      ]}
    >
      <Header navigation={navigation} showNewTask={showNewTask} />

      {tasks.length ? (
        tasks.every((task) => task.completed[today] && !settings.history) ? (
          <TasksAchieved />
        ) : (
          <Tasks navigation={navigation} />
        )
      ) : (
        <NoTask />
      )}

      <NewTask
        newTaskTranslateY={newTaskTranslateY}
        hideNewTask={hideNewTask}
        showModalBackground={showModalBackground}
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
