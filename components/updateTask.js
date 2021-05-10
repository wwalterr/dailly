import React, { useState } from "react";

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";

import { Switch } from "react-native-switch";

import DateTimePicker from "@react-native-community/datetimepicker";

import { createIconSetFromFontello, Ionicons } from "@expo/vector-icons";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import EmojiPicker from "./emojiPicker";

const activeText = "Yes";

const inActiveText = "No";

const messageNewGoal = "Goal updated!";

const UpdateTask = ({ task }) => {
  const { updateTask, findTask } = useTasks();

  const [text, setText] = useState(task.text);

  const [textError, setTextError] = useState(false);

  const [remind, setRemind] = useState(task.remind);

  const [increment, setIncrement] = useState(task.increment);

  const [emoji, setEmoji] = useState(task.emoji);

  const [category, setCategory] = useState("");

  const [date, setDate] = useState(
    task.remindTime ? new Date(task.remindTime) : new Date()
  );

  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.rowText]}>
        <TextInput
          placeholder="Describe your goal"
          placeholderTextColor={theme.color.gray.main}
          textAlign="left"
          multiline={true}
          spellCheck={true}
          autoFocus={false}
          underlineColorAndroid="transparent"
          value={text}
          onChangeText={(_text) => {
            setText(_text);

            if (text) setTextError(false);
          }}
          style={styles.textInput}
        />

        {textError ? (
          <Text style={styles.textError}>
            You can't have a empty goal, describe your goal!
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowIncrement]}>
        <Text style={styles.text}>Is your goal incremental?</Text>

        <Switch
          activeText={activeText}
          inActiveText={inActiveText}
          value={increment}
          onValueChange={() => {
            Keyboard.dismiss();

            setIncrement((previousIncrement) => !previousIncrement);
          }}
          circleSize={18}
          circleBorderWidth={0}
          barHeight={25}
          backgroundActive={theme.color.black.main}
          backgroundInactive={theme.color.black.main}
          circleActiveColor={theme.color.green.main}
          circleInActiveColor={theme.color.red.main}
          outerCircleStyle={{
            backgroundColor: theme.color.black.main,
            width: 50,
            borderRadius: 50,
          }}
        />
      </View>

      <View style={[styles.row, styles.rowRemind]}>
        <Text style={styles.text}>Do you want to receive daily reminds?</Text>

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
          backgroundActive={theme.color.black.main}
          backgroundInactive={theme.color.black.main}
          circleActiveColor={theme.color.green.main}
          circleInActiveColor={theme.color.red.main}
          outerCircleStyle={{
            backgroundColor: theme.color.black.main,
            width: 50,
            borderRadius: 50,
          }}
        />
      </View>

      {remind ? (
        <View style={[styles.row, styles.rowTimePicker]}>
          <Text style={styles.text}>
            When do you want to receive the remind
          </Text>

          <Ionicons
            name="timer"
            size={24}
            color="black"
            onPress={() =>
              setShowTimePicker(
                (previousShowTimePicker) => !previousShowTimePicker
              )
            }
            style={styles.timePickerIcon}
          />

          {showTimePicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              textColor="black"
              is24Hour={true}
              display="default"
              onChange={(event, value) => {
                setShowTimePicker(false);

                setDate(new Date(value));
              }}
              style={styles.datePicker}
            />
          ) : null}
        </View>
      ) : null}

      <View style={[styles.row, styles.rowCategory]}>
        <View style={styles.containerCategory}>
          <Text style={styles.textCategory}>Choose an emoji to your goal</Text>
          <Text style={[styles.textCategory, styles.textEmoji]}>
            {emoji.emoji}
          </Text>
        </View>

        <EmojiPicker
          emoji={emoji}
          setEmoji={setEmoji}
          category={category}
          setCategory={setCategory}
        />
      </View>

      <View style={[styles.row, styles.rowButton]}>
        <TouchableOpacity
          onPress={async () => {
            if (!text) {
              setTextError(true);

              return;
            }

            let identifier;

            const _task = await findTask(task.id);

            if (_task.identifier)
              await cancelPushNotification(_task.identifier);

            if (remind) {
              identifier = await schedulePushNotification(
                {
                  title: `Check your daily goal ${emoji.emoji}`,
                  body: text,
                  vibrate: true,
                },
                {
                  hour: date.getHours(),
                  minute: date.getMinutes(),
                  repeats: true,
                }
              );
            }

            updateTask(task.id, {
              id: task.id,
              text: text.trim(),
              remind,
              ...(remind ? { identifier } : {}),
              ...(remind ? { remindTime: date.getTime() } : {}),
              increment,
              ...(increment ? { counter: 0 } : {}),
              emoji,
              createdAt: task.createdAt,
            });

            if (Platform.OS != "android")
              Snackbar.show({
                text: messageNewGoal,
                duration: Snackbar.LENGTH_SHORT,
              });
            else ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

            Keyboard.dismiss();
          }}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 32,
  },
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
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
  rowIncrement: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
  rowTimePicker: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  timePickerIcon: {},
  datePicker: {},
  rowCategory: {
    flexDirection: "column",
  },
  containerCategory: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textCategory: {
    marginBottom: 10,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  textEmoji: {
    fontSize: 22,
    marginLeft: 14,
  },
  rowButton: {
    height: 45,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    backgroundColor: theme.color.black.main,
  },
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.white.main,
  },
});

export default UpdateTask;
