import React, { useState } from "react";

import {
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import { limitText, capitalize } from "../utils/text";

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import Button from "./button";

import Information from "./information";

import Design from "./design";

const messageNewGoal = "Goal updated!";

const UpdateTask = ({ task, navigation }) => {
  const { isDark } = useSettings();

  const { updateTask, findTask } = useTasks();

  const [text, setText] = useState(task.text);

  const [textError, setTextError] = useState(false);

  const [remind, setRemind] = useState(task.remind);

  const [increment, setIncrement] = useState(task.increment);

  const [incrementText, setIncrementText] = useState(
    task.incrementText ? task.incrementText : ""
  );

  const [emoji, setEmoji] = useState(task.emoji);

  const [category, setCategory] = useState("Smileys & Emotion");

  const [date, setDate] = useState(
    task.remindTime ? new Date(task.remindTime) : new Date()
  );

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [cardColor, setCardColor] = useState(task.cardColor);

  const [showCardColor, setShowCardColor] = useState(false);

  const [cardFontColor, setCardFontColor] = useState(task.cardFontColor);

  const [showCardFontColor, setShowCardFontColor] = useState(false);

  const [colorError, setColorError] = useState(false);

  const resetFields = () => {
    Keyboard.dismiss();

    setTextError(false);

    setColorError(false);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Information
        text={text}
        setText={setText}
        textError={textError}
        setTextError={setTextError}
        remind={remind}
        setRemind={setRemind}
        increment={increment}
        setIncrement={setIncrement}
        incrementText={incrementText}
        setIncrementText={setIncrementText}
        date={date}
        setDate={setDate}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
      />

      <Design
        category={category}
        setCategory={setCategory}
        emoji={emoji}
        setEmoji={setEmoji}
        cardColor={cardColor}
        setCardColor={setCardColor}
        showCardColor={showCardColor}
        setShowCardColor={setShowCardColor}
        cardFontColor={cardFontColor}
        setCardFontColor={setCardFontColor}
        showCardFontColor={showCardFontColor}
        setShowCardFontColor={setShowCardFontColor}
        colorError={colorError}
      />

      <View style={[styles.row, styles.rowButton]}>
        <Button
          onPress={async () => {
            if (!text) {
              setTextError(true);

              return;
            }

            if (cardColor === cardFontColor) {
              setColorError(true);

              return;
            }

            let identifier;

            const _task = await findTask(task.id);

            if (_task.identifier)
              await cancelPushNotification(_task.identifier);

            if (remind) {
              identifier = await schedulePushNotification(
                {
                  title: `Check your goal ${emoji.emoji}`,
                  body: capitalize(limitText(text, 34)),
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
              ...(increment ? { incrementText } : {}),
              ...(increment
                ? { counter: task.counter ? task.counter : 0 }
                : {}),
              emoji,
              createdAt: task.createdAt,
              cardColor,
              cardFontColor,
            });

            if (Platform.OS === "android")
              ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

            resetFields();

            navigation.goBack();
          }}
          text="Update goal"
          style={isDark ? { backgroundColor: theme.color.black.light } : {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 32,
  },
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
    marginBottom: 42,
  },
  rowButton: {
    height: 45,
    marginBottom: 12,
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
