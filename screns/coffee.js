import React from "react";

import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme";

import HeaderGoBack from "../components/headerGoBack";

import Coffee from "../components/coffee";

const CoffeeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGoBack navigation={navigation} />

      <Coffee />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
  },
});

export default CoffeeScreen;
