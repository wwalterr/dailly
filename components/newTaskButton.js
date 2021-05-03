import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

import theme from "../theme";

const NewTaskButton = ({ showNewTask }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        showNewTask();
      }}
      activeOpacity={0.8}
      style={styles.button}
    >
      <Text style={styles.buttonText}>New goal</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
});

export default NewTaskButton;
