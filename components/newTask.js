import React, { useState, memo } from "react";

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";

import { Switch } from "react-native-switch";

import { Animated } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import generateRandomCode from "../utils/random";

import { schedulePushNotification } from "../utils/notifications";

import EmojiPicker from "./emojiPicker";

const activeText = "Yes";

const inActiveText = "No";

const messageNewGoal = "Goal created!";

const defaultEmoji = {};

const NewTask = ({ newTaskTranslateY, hideNewTask }) => {
  const { createTask } = useTasks();

  const [text, setText] = useState("");

  const [textError, setTextError] = useState(false);

  const [remind, setRemind] = useState(false);

  const [increment, setIncrement] = useState(false);

  const [emoji, setEmoji] = useState(defaultEmoji);

  const [emojiError, setEmojiError] = useState(false);

  const [category, setCategory] = useState("");

  const resetFields = () => {
    Keyboard.dismiss();

    setText("");

    setTextError(false);

    setRemind(false);

    setIncrement(false);

    setEmoji(defaultEmoji);

    setEmojiError(false);

    setCategory("");
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ translateY: newTaskTranslateY }],
      }}
    >
      <View style={styles.rowClose}>
        <AntDesign
          name="close"
          size={20}
          onPress={() => {
            resetFields();

            hideNewTask();
          }}
          color={theme.color.gray.dark}
          style={styles.closeIcon}
        />
      </View>

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
            To create a goal you need to describe it!
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
          setEmojiError={setEmojiError}
          category={category}
          setCategory={setCategory}
        />

        {emojiError ? (
          <Text style={styles.textError}>
            To create a goal you need to choose an emoji!
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowButton]}>
        <TouchableOpacity
          onPress={async () => {
            if (!text) {
              setTextError(true);

              return;
            }

            if (!Object.keys(emoji).length) {
              setEmojiError(true);

              return;
            }

            let identifier;

            if (remind) {
              identifier = await schedulePushNotification({
                title: `Check your daily goal ${emoji.emoji}`,
                body: text,
                vibrate: true,
              });
            }

            createTask({
              id: generateRandomCode(),
              text: text.trim(),
              remind,
              ...(remind ? { identifier } : {}),
              increment,
              ...(increment ? { counter: 0 } : {}),
              emoji,
              createdAt: new Date().toLocaleDateString(),
            });

            if (Platform.OS != "android")
              Snackbar.show({
                text: messageNewGoal,
                duration: Snackbar.LENGTH_SHORT,
              });
            else ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

            resetFields();

            hideNewTask();
          }}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create goal</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    width: "100%",
    height: "65%",
    minHeight: Dimensions.get("window").height / 2,
    zIndex: 999,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 32,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
    padding: 1,
    borderRadius: 5,
  },
  closeIcon: {},
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
    marginLeft: 5,
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

export default memo(NewTask);
