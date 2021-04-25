import React from "react";

import { View, Text, StyleSheet } from "react-native";

const Tasks = () => {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d6d7",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Tasks;
