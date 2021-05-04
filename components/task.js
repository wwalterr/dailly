import React from "react";

import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import { cancelPushNotification } from "../utils/notifications";

const height = Dimensions.get("window").height - 64;

const task_margin = 16;

const task_height = 145 + task_margin * 2;

const message = "Goal removed!";

const Task = ({ task, index, y, navigation }) => {
  const { removeTask, updateTask } = useTasks();

  const position = Animated.subtract(index * task_height, y);

  const isDisappearing = -task_height;

  const isAppearing = height;

  const isTop = 0;

  const isBottom = height - task_height;

  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * task_height],
      outputRange: [0, -index * (task_height + 2 * task_margin)],
      extrapolateRight: "clamp",
    })
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolateRight: "clamp",
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: task_height,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <View style={styles.containerHeader}>
        <Text style={styles.createdAt}>{task.createdAt}</Text>

        <Text style={styles.emoji}>{task.emoji.emoji}</Text>
      </View>

      <View style={styles.containerOutsider}>
        <View style={styles.containerInsider}>
          <View style={styles.containerContent}>
            <ScrollView
              style={styles.containerText}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <Text style={styles.text}>{task.text}</Text>
            </ScrollView>
          </View>

          <View style={styles.containerActions}>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={async () => {
                  if (task.remind)
                    await cancelPushNotification(task.identifier);

                  removeTask(task.id);

                  if (Platform.OS != "android")
                    Snackbar.show({
                      text: message,
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  else ToastAndroid.show(message, ToastAndroid.SHORT);
                }}
                activeOpacity={0.8}
                key={"remove"}
                style={styles.removeButton}
              >
                <Text style={styles.remove}>Remove</Text>

                <Text style={styles.highlight}>•</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate("Update Task", task);
                }}
                activeOpacity={0.8}
                key={"update"}
                style={styles.updateButton}
              >
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {task.increment ? (
          <View style={styles.containerCounter}>
            <TouchableOpacity
              onPress={() => {
                updateTask(task.id, {
                  ...task,
                  counter: task.counter + 1,
                });
              }}
              activeOpacity={0.8}
              key={"plus"}
              style={styles.counterPlus}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>

            <Text style={styles.counter}>{task.counter}</Text>

            <TouchableOpacity
              onPress={() => {
                if (task.counter >= 1)
                  updateTask(task.id, {
                    ...task,
                    counter: task.counter - 1,
                  });
              }}
              activeOpacity={0.8}
              key={"minus"}
              style={styles.counterMinus}
            >
              <Text style={styles.minus}>-</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginHorizontal: 22,
    marginVertical: task_margin,
    borderRadius: 5,
    padding: 20,
    backgroundColor: theme.color.black.main,
  },
  containerHeader: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createdAt: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: "Inter_300Light",
    fontSize: 14,
    color: theme.color.white.main,
  },
  emoji: {
    fontSize: 22,
  },
  containerOutsider: {
    flex: 1,
    flexDirection: "row",
  },
  containerInsider: {
    flex: 1,
    flexDirection: "column",
  },
  containerContent: {
    flex: 0.85,
    flexDirection: "row",
  },
  containerText: {
    flex: 1,
  },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 26,
    color: theme.color.white.main,
  },
  containerCounter: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 4,
  },
  counterPlus: {
    paddingHorizontal: 6,
  },
  plus: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    color: theme.color.white.main,
  },
  counter: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    color: theme.color.white.main,
    paddingHorizontal: 6,
  },
  counterMinus: {
    paddingHorizontal: 6,
  },
  minus: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    color: theme.color.white.main,
  },
  containerActions: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  removeButton: {
    flexDirection: "row",
  },
  remove: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
  highlight: {
    marginLeft: 8,
    color: theme.color.white.main,
  },
  updateButton: {
    marginLeft: 8,
  },
  update: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
});

export default Task;
