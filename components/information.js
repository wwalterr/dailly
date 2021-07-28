import React, { memo } from "react";

import { View, Text, Keyboard, StyleSheet } from "react-native";

import { Switch } from "react-native-switch";

import Modal from "react-native-modal";

import DatePicker from "react-native-date-picker";

import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import { Ionicons } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import Close from "./close";

const activeText = "Yes";

const inActiveText = "No";

const Information = ({
  text,
  setText,
  textError,
  setTextError,
  remind,
  setRemind,
  date,
  setDate,
  showTimePicker,
  setShowTimePicker,
}) => {
  const { isDark } = useSettings();

  return (
    <>
      <View style={[styles.row, styles.rowText]}>
        <AutoGrowingTextInput
          placeholder="Describe your goal"
          placeholderTextColor={theme.color.gray.main}
          textAlign="left"
          multiline={true}
          spellCheck={true}
          autoFocus={false}
          maxHeight={100}
          underlineColorAndroid={theme.color.transparent}
          value={text}
          onChangeText={(_text) => {
            setText(_text);

            if (text) setTextError(false);
          }}
          style={styles.textInput}
        />

        {textError ? (
          <Text style={styles.textError}>You can't have an empty</Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowRemind]}>
        <Text
          style={[
            styles.text,
            styles.switchText,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Do you want to receive reminders?
        </Text>

        <Switch
          activeText={activeText}
          inActiveText={inActiveText}
          value={remind}
          onValueChange={() => {
            Keyboard.dismiss();

            setRemind((previousRemind) => !previousRemind);
          }}
          circleSize={18}
          circleBorderWidth={0}
          barHeight={25}
          backgroundActive={
            isDark ? theme.color.black.light : theme.color.black.main
          }
          backgroundInactive={
            isDark ? theme.color.black.light : theme.color.black.main
          }
          circleActiveColor={theme.color.green.main}
          circleInActiveColor={theme.color.red.main}
          outerCircleStyle={{
            backgroundColor: isDark
              ? theme.color.black.light
              : theme.color.black.main,
            width: 50,
            borderRadius: 50,
          }}
        />
      </View>

      {remind ? (
        <View style={[styles.row, styles.rowTimePicker]}>
          <Text
            style={[
              styles.text,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            When to send you reminders
          </Text>

          <Ionicons
            name="timer"
            size={26}
            color={isDark ? theme.color.white.main : theme.color.black.main}
            onPress={() =>
              setShowTimePicker(
                (previousShowTimePicker) => !previousShowTimePicker
              )
            }
            style={styles.timePickerIcon}
          />

          <Modal
            isVisible={showTimePicker}
            onBackButtonPress={() => {
              setShowTimePicker(false);
            }}
            backdropColor={
              isDark ? theme.color.black.main : theme.color.white.main
            }
            backdropOpacity={1}
            backdropTransitionInTiming={350}
            backdropTransitionOutTiming={250}
            useNativeDriverForBackdrop={true}
            style={[
              styles.containerModal,
              isDark ? { backgroundColor: theme.color.black.main } : {},
            ]}
          >
            <View style={styles.containerDatePicker}>
              <DatePicker
                date={date}
                onDateChange={setDate}
                androidVariant="iosClone"
                mode="time"
                textColor={
                  isDark ? theme.color.white.main : theme.color.black.main
                }
                fadeToColor={
                  isDark ? theme.color.black.main : theme.color.white.main
                }
              />
            </View>

            <Close hide={() => setShowTimePicker(false)} />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
    marginBottom: 42,
  },
  rowText: {
    flexDirection: "column",
  },
  textInput: {
    height: 45,
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
    backgroundColor: theme.color.blue.light,
  },
  textError: {
    paddingTop: 5,
    fontFamily: "Inter_300Light",
    fontSize: 10,
    color: theme.color.red.main,
  },

  text: {
    marginRight: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  switchText: {
    marginRight: 16,
  },
  rowRemind: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rowTimePicker: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerModal: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  containerDatePicker: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  timePickerIcon: {
    paddingVertical: 8,
    paddingLeft: 2,
    paddingRight: 12,
  },
  datePicker: {},
});

export default memo(Information);
