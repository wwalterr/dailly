import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import Modal from "react-native-modal";

import { FontAwesome } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import Close from "./close";

const FontPicker = ({
  text = "",
  font,
  fontSetter,
  fonts,
  showPicker,
  showPickerSetter,
  hideQuestion = false,
}) => {
  const { isDark } = useSettings();

  return (
    <View style={styles.container}>
      {hideQuestion ? null : (
        <View style={styles.question}>
          <Text
            style={[
              styles.text,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            {text}
          </Text>

          <TouchableOpacity
            onPress={() => {
              showPickerSetter((previousShowPicker) => !previousShowPicker);
            }}
            activeOpacity={0.8}
            style={styles.buttonColor}
          >
            <FontAwesome
              name="font"
              size={16}
              color={theme.color.black.main}
              style={[
                styles.fontIcon,
                isDark
                  ? {
                      backgroundColor: theme.color.white.main,
                      color: theme.color.black.main,
                    }
                  : {},
              ]}
            />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        isVisible={showPicker}
        onBackButtonPress={() => {
          showPickerSetter(false);
        }}
        backdropColor={isDark ? theme.color.black.main : theme.color.white.main}
        backdropOpacity={1}
        backdropTransitionInTiming={350}
        backdropTransitionOutTiming={250}
        useNativeDriverForBackdrop={true}
        style={[
          styles.containerModal,
          isDark ? { backgroundColor: theme.color.black.main } : {},
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {fonts.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                fontSetter(item);

                showPickerSetter(false);
              }}
              activeOpacity={0.8}
              key={item}
              style={[styles.fontPicker]}
            >
              <Text
                style={[
                  styles.textGoal,
                  {
                    color:
                      item === font
                        ? // Selected font
                          isDark
                          ? theme.color.black.light
                          : theme.color.gray.dark
                        : // Other fonts
                        isDark
                        ? theme.color.white.main
                        : theme.color.black.main,
                    fontFamily: item,
                  },
                ]}
              >
                #{index} Goal font
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.containerActions}>
          <Close
            hide={() => {
              showPickerSetter(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  question: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginRight: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  buttonColor: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  fontIcon: {
    backgroundColor: theme.color.black.main,
    borderRadius: 25,
    color: theme.color.white.main,
    padding: 4,
    marginLeft: 4,
  },
  containerModal: {
    marginBottom: 8,
  },
  containerActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 4,
    marginTop: 4,
  },
  fontPicker: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    marginVertical: 14,
  },
  textGoal: {
    fontSize: 30,
    color: theme.color.white.main,
  },
});

export default FontPicker;
