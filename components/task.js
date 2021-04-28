import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

const HEIGHT = Dimensions.get("window").height - 64;

const TASK_MARGIN = 16;

const TASK_HEIGHT = 50 + TASK_MARGIN * 2;

const Task = ({ task, index, y }) => {
  const { removeTask, updateTask } = useTasks();

  const [text, setText] = useState(task.text);

  const [remind, setRemind] = useState(task.remind);

  const [increment, setIncrement] = useState(task.increment);

  const [counter, setCounter] = useState(task.counter ? task.counter : 0);

  const position = Animated.subtract(index * TASK_HEIGHT, y);

  const isDisappearing = -TASK_HEIGHT;

  const isAppearing = HEIGHT;

  const isTop = 0;

  const isBottom = HEIGHT - TASK_HEIGHT;

  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * TASK_HEIGHT],
      outputRange: [0, -index * (TASK_HEIGHT + 2 * TASK_MARGIN)],
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
          height: TASK_HEIGHT,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {task.emoji ? <Text>{task.emoji.emoji}</Text> : null}

      <TextInput onChangeText={setText} value={text} />

      {/* <Emoji name={emojis[0].aliases[0]} style={{ fontSize: 50 }} /> */}

      {/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={increment ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          setIncrement((previousIncrement) => !previousIncrement)
        }
        value={increment}
      />

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={remind ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setRemind((previousRemind) => !previousRemind)}
        value={remind}
      /> */}

      <Text>{task.createdAt}</Text>

      {/* <Button
        title="Update"
        color="#841584"
        onPress={() =>
          updateTask(task.id, {
            id: task.id,
            category: "",
            text: text.trim(),
            remind,
            increment,
            ...(increment ? { counter } : {}),
            createdAt: task.createdAt,
          })
        }
      />
       */}
      <Button
        title="Remove"
        color="#000000"
        onPress={() => removeTask(task.id)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginVertical: TASK_MARGIN,
    backgroundColor: theme.color.gray.light,
  },
});

export default Task;
