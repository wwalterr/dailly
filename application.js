import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { registerRootComponent } from "expo";

const Application = () => {
  return (
    <View style={styles.container}>
      <Text>Application</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(Application);
