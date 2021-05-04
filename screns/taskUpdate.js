import React from "react";

import { Text, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme";

import HeaderGoBack from "../components/headerGoBack";

const TaskUpdateScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGoBack navigation={navigation} />

      <Text>{JSON.stringify(route.params)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
  },
});

export default TaskUpdateScreen;
