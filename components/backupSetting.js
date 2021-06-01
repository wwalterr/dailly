import React from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const BackupSetting = ({ navigation }) => {
  const { isDark } = useSettings();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate("Backup");
        }}
        activeOpacity={0.8}
        style={[
          styles.buttonImage,
          isDark
            ? {
                backgroundColor: theme.color.black.light,
              }
            : {},
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/settings/hdd.png")}
        />
      </TouchableOpacity>

      <View style={styles.containerContent}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Backup
        </Text>

        <Text style={styles.description}>Secure and control your data</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    marginTop: 32,
  },
  buttonImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: theme.color.black.main,
  },
  image: {
    width: 25,
    height: 25,
  },
  containerContent: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: theme.color.black.main,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.gray.main,
  },
});

export default BackupSetting;
