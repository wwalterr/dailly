import React from "react";

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import theme from "../theme";

const NewTaskButton = ({ showNewTask }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          showNewTask();
        }}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create a new goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // position: "absolute",
    // bottom: 0,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    backgroundColor: theme.color.black.main,
  },
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.white.main,
  },
});

export default NewTaskButton;
