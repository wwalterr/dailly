import React from "react";

import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import HeaderGoBack from "../components/headerGoBack";

import PrivacyPolicy from "../components/privacyPolicy";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGoBack navigation={navigation} />

      <PrivacyPolicy />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PrivacyPolicyScreen;
