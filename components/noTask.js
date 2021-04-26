import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const NoTask = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="emoji-flags" size={68} color="black" />

      <Text style={styles.text}>You don't have goals</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 32,
  },
  text: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    marginTop: 15,
  },
});

export default NoTask;
