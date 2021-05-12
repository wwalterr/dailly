import React from "react";

import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import theme from "../theme";

const PaymentButton = ({ text, onPress, loading, disabled, style = {} }) => {
  return (
    <TouchableOpacity
      onPress={(event) => {
        if (loading || disabled) return;

        if (onPress) onPress(event);
      }}
      activeOpacity={0.8}
      key={text}
      style={[styles.button, style]}
    >
      {loading ? (
        <ActivityIndicator
          animating
          size="small"
          color={theme.color.white.main}
        />
      ) : null}

      {!loading && !disabled ? (
        <Text style={styles.buttonText}>{text}</Text>
      ) : null}

      {!loading && disabled ? (
        <Text style={styles.buttonText}>{disabledText || text}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 5,
    backgroundColor: theme.color.black.main,
    marginTop: 22,
  },
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.white.main,
  },
});

export default PaymentButton;
