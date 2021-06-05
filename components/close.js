import React from "react";

import { StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import theme from "../theme";

const Close = ({ hide, reset, iconStyle = {} }) => {
  return (
    <AntDesign
      name="close"
      size={20}
      onPress={() => {
        if (hide) hide();

        if (reset) reset();
      }}
      color={theme.color.gray.dark}
      style={[styles.closeIcon, iconStyle]}
    />
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    padding: 12,
    paddingRight: 0,
  },
});

export default Close;
