import React, { useState, memo } from "react";

import {
  View,
  Text,
  ToastAndroid,
  Platform,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import { Switch } from "react-native-switch";

import { Animated } from "react-native";

import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import Modal from "react-native-modal";

import DatePicker from "react-native-date-picker";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import { limitText, capitalize } from "../utils/text";

import generateRandomCode from "../utils/random";

import { schedulePushNotification } from "../utils/notifications";

import Close from "./close";

import Button from "./button";

const activeText = "Yes";

const inActiveText = "No";

const messageNewGoal = "Goal created";

const NewTask = ({ newTaskTranslateY, hideNewTask, showModalBackground }) => {
  const { settings, isDark } = useSettings();

  const { createTask } = useTasks();

  const [text, setText] = useState("");

  const [textError, setTextError] = useState(false);

  const [remind, setRemind] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const today = moment().format("YYYY-MM-DD");

  const resetFields = () => {
    Keyboard.dismiss();

    setText("");

    setTextError(false);

    setRemind(false);

    setDate(new Date());
  };

  return (
    <>
      {showModalBackground ? (
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();

            hideNewTask();
          }}
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: isDark
              ? theme.color.black.hover
              : theme.color.white.hover,
          }}
          key="modal-shadow"
        ></TouchableOpacity>
      ) : null}

      <Animated.View
        style={[
          {
            ...styles.container,
            transform: [{ translateY: newTaskTranslateY }],
          },
          isDark ? { backgroundColor: theme.color.black.main } : {},
        ]}
      >
        <View style={styles.rowClose}>
          <Close
            hide={hideNewTask}
            reset={resetFields}
            iconStyle={{ paddingVertical: 0 }}
          />
        </View>

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
            <Text style={styles.textError}>
              To create a goal you need to describe it
            </Text>
          ) : null}
        </View>

        <View style={[styles.row, styles.rowRemind]}>
          <Text
            style={[
              styles.text,
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

              if (!remind) setShowTimePicker(true);
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

        <View style={[styles.row, styles.rowButton]}>
          <Button
            style={isDark ? { backgroundColor: theme.color.black.light } : {}}
            onPress={async () => {
              if (!text.trim()) {
                setTextError(true);

                return;
              }

              let identifier;

              if (remind) {
                identifier = await schedulePushNotification(
                  {
                    title: `Achieve your goal`,
                    body: capitalize(limitText(text, 48)),
                    vibrate: true,
                  },
                  {
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    repeats: true,
                  }
                );
              }

              createTask({
                id: generateRandomCode(),
                text: text.trim(),
                remind,
                ...(remind ? { identifier } : {}),
                ...(remind ? { remindTime: date.getTime() } : {}),
                emoji: {},
                completed: {
                  [today]: false,
                },
                font: settings.font ? settings.font : "Inter_600SemiBold",
                cardColor: theme.color.black.main,
                cardFontColor: theme.color.white.main,
                createdAt: new Date().getTime(),
              });

              if (Platform.OS === "android")
                ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

              resetFields();

              hideNewTask();
            }}
            text="Create goal"
          />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    width: "100%",
    height: "35%",
    minHeight: Dimensions.get("window").height / 2,
    zIndex: 999,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 32,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    elevation: 15,
    shadowColor: theme.color.black.main,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    backgroundColor: theme.color.white.main,
  },
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
  },
  rowClose: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 5,
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
    marginRight: 16,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  rowRemind: {
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
  rowButton: {
    height: 45,
  },
});

export default memo(NewTask);
