import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from "react-native";

import { useTasks } from "../contexts/tasks";

const Task = ({ task }) => {
  const { removeTask, updateTask } = useTasks();

  const [text, setText] = useState(task.text);

  const [remind, setRemind] = useState(task.remind);

  const [increment, setIncrement] = useState(task.increment);

  const [counter, setCounter] = useState(task.counter ? task.counter : 0);

  return (
    <View style={styles.container}>
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
      <Button
        title="Remove"
        color="#841584"
        onPress={() => removeTask(task.id)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#f00",
    margin: 24,
  },
});

export default Task;
