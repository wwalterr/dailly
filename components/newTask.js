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

import { Animated } from "react-native";

import { AntDesign } from "@expo/vector-icons";

// import Emoji from "react-native-emoji";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

// import emojis from "../utils/emojis";

import generateRandomCode from "../utils/random";

const activeText = "Yes";

const inActiveText = "No";

const message = "Goal created";

const NewTask = ({ newTaskTranslateY, hideNewTask }) => {
  const { createTask } = useTasks();

  const [text, setText] = useState("");

  const [textError, setTextError] = useState(false);

  const [remind, setRemind] = useState(false);

  const [increment, setIncrement] = useState(false);

  const resetFields = () => {
    setText("");

    setTextError(false);

    setRemind(false);

    setIncrement(false);
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
            Keyboard.dismiss();

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
          onChangeText={setText}
          style={styles.textInput}
        />

        <Text style={styles.textError}>
          {textError ? "To create a goal you need to describe it!" : ""}
        </Text>
      </View>

      {/* <View style={styles.row}>
        <Emoji name={emojis[*].aliases[*]} style={{ fontSize: 50 }} />
      </View> */}

      <View style={[styles.row, styles.rowIncrement]}>
        <Text style={styles.text}>Is your goal incremental?</Text>

        <Switch
          activeText={activeText}
          inActiveText={inActiveText}
          value={increment}
          onValueChange={() =>
            setIncrement((previousIncrement) => !previousIncrement)
          }
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
          onValueChange={() => setRemind((previousRemind) => !previousRemind)}
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

      <View style={[styles.row, styles.rowButton]}>
        <TouchableOpacity
          onPress={() => {
            if (!text) {
              setTextError(true);

              return;
            }

            createTask({
              id: generateRandomCode(),
              category: "",
              text: text.trim(),
              remind,
              increment,
              ...(increment ? { counter: 0 } : {}),
              createdAt: new Date().toLocaleDateString(),
            });

            if (Platform.OS != "android")
              Snackbar.show({
                text: message,
                duration: Snackbar.LENGTH_SHORT,
              });
            else ToastAndroid.show(message, ToastAndroid.SHORT);

            Keyboard.dismiss();

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
    justifyContent: "space-evenly",
    width: "100%",
    height: "50%",
    zIndex: 999,
    minHeight: 300,
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
  rowText: {},
  textInput: {
    width: "100%",
    height: 40,
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

export default NewTask;
