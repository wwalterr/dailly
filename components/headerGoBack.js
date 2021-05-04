import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import theme from "../theme";

const HeaderGoBack = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        key={"go-back"}
        style={styles.button}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color={theme.color.black.main}
          style={styles.icon}
        />

        <Text style={styles.text}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  icon: { marginRight: 8 },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: theme.color.black.main,
  },
});

export default HeaderGoBack;
