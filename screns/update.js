import React from "react";

import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import HeaderGoBack from "../components/headerGoBack";

import UpdateTask from "../components/updateTask";

const UpdateScreen = ({ route, navigation }) => {
  const { isDark } = useSettings();

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark
          ? {
              backgroundColor: theme.color.black.main,
            }
          : {},
      ]}
    >
      <HeaderGoBack navigation={navigation} />

      <UpdateTask task={route.params} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
  },
});

export default UpdateScreen;
