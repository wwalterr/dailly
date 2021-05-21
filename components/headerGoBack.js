import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const HeaderGoBack = ({ navigation }) => {
  const { isDark } = useSettings();

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
          size={22}
          color={isDark ? theme.color.white.main : theme.color.black.main}
          style={styles.arrowIcon}
        />

        <Text
          style={[styles.text, isDark ? { color: theme.color.white.main } : {}]}
        >
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    marginTop: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  arrowIcon: { marginRight: 8 },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: theme.color.black.main,
  },
});

export default HeaderGoBack;
