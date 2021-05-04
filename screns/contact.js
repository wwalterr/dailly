import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme";

import HeaderGoBack from "../components/headerGoBack";

const ContactScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGoBack navigation={navigation} />

      <View style={styles.containerEmail}>
        <Text style={styles.emailText}>Contact us at:</Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:hello.dailly@gmail.com")}
          activeOpacity={0.8}
          key={"contact"}
          style={styles.button}
        >
          <Text style={styles.buttonText}>hello.dailly@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
  },
  containerEmail: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 32,
  },
  emailText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  button: {
    marginLeft: 8,
  },
  buttonText: {
    textDecorationLine: "underline",
  },
});

export default ContactScreen;
