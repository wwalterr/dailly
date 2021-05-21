import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import Modal from "react-native-modal";

import { MaterialIcons } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import Close from "./close";

const ColorPicker = ({
  text,
  showPicker,
  showPickerSetter,
  color,
  colorSetter,
  colors,
}) => {
  const { isDark } = useSettings();

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.text}>{text}</Text>

        <TouchableOpacity
          onPress={() => {
            showPickerSetter((previousShowPicker) => !previousShowPicker);
          }}
          activeOpacity={0.8}
          style={styles.buttonColor}
        >
          <MaterialIcons
            name="invert-colors"
            size={21}
            color={theme.color.black.main}
            style={styles.colorIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showPicker}
        backdropColor={isDark ? theme.color.black.main : theme.color.white.main}
        backdropOpacity={1}
        backdropTransitionInTiming={350}
        backdropTransitionOutTiming={250}
        useNativeDriverForBackdrop={true}
        style={styles.containerModal}
      >
        <View style={styles.containerActions}>
          <Close
            hide={() => {
              showPickerSetter(false);
            }}
          />
        </View>

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
          {colors.map((item) => (
            <TouchableOpacity
              onPress={() => {
                colorSetter(item);

                showPickerSetter(false);
              }}
              activeOpacity={0.8}
              key={item}
              style={[
                styles.colorPick,
                {
                  backgroundColor: item,
                  borderWidth: item === theme.color.white.main ? 1 : 0,
                },
              ]}
            >
              {color === item ? (
                <Text
                  style={[
                    styles.highlight,
                    {
                      color:
                        item === theme.color.white.main
                          ? theme.color.black.main
                          : theme.color.white.main,
                    },
                  ]}
                >
                  •
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  colorIcon: {
    backgroundColor: theme.color.black.main,
    borderRadius: 25,
    color: theme.color.white.main,
    padding: 1,
    marginLeft: 4,
  },
  containerActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 8,
  },
  flatListColors: {
    maxWidth: "100%",
  },
  colorPick: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
    borderRadius: 5,
    marginVertical: 14,
    borderColor: theme.color.gray.light,
  },
  highlight: {
    fontSize: 25,
    color: theme.color.white.main,
  },
});

export default ColorPicker;
