import React from "react";

import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import HeaderGoBack from "../components/headerGoBack";

import ThemeSetting from "../components/themeSetting";

import CardSetting from "../components/cardSetting";

import HistorySetting from "../components/historySetting";

const SettingsScreen = ({ navigation }) => {
  const { isDark } = useSettings();

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark ? { backgroundColor: theme.color.black.main } : {},
      ]}
    >
      <HeaderGoBack navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
      >
        <ThemeSetting />

        <CardSetting />

        <HistorySetting />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
  },
});

export default SettingsScreen;
