import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import FontPicker from "../components/fontPicker";

const messageFont = "Font updated";

const FontSetting = () => {
  const { settings, isDark, updateSettings } = useSettings();

  const [font, setFont] = useState(
    settings.font ? settings.font : "Inter_600SemiBold"
  );

  const [showFont, setShowFont] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          setShowFont(true);
        }}
        activeOpacity={0.8}
        style={[
          styles.buttonImage,
          {
            backgroundColor: isDark
              ? theme.color.black.light
              : theme.color.black.main,
          },
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/settings/font.png")}
        />
      </TouchableOpacity>

      <View style={styles.containerContent}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Font
        </Text>

        <Text style={styles.description}>Choose the default card font</Text>

        <FontPicker
          font={font}
          fontSetter={(font) => {
            updateSettings({ font });

            if (Platform.OS === "android")
              ToastAndroid.show(messageFont, ToastAndroid.SHORT);
          }}
          fonts={theme.fonts}
          showPicker={showFont}
          showPickerSetter={setShowFont}
          hideQuestion={true}
        />
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
    width: 22,
    height: 22,
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

export default FontSetting;
