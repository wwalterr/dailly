import React, { memo } from "react";

import { View, Text, TextInput, Keyboard, StyleSheet } from "react-native";

import { Switch } from "react-native-switch";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";

import theme from "../theme";

const activeText = "Yes";

const inActiveText = "No";

const Information = ({
  text,
  setText,
  textError,
  setTextError,
  remind,
  setRemind,
  increment,
  setIncrement,
  incrementText,
  setIncrementText,
  date,
  setDate,
  showTimePicker,
  setShowTimePicker,
}) => (
  <>
    <View style={[styles.row, styles.rowText]}>
      <TextInput
        placeholder="Describe your goal"
        placeholderTextColor={theme.color.gray.main}
        textAlign="left"
        multiline={true}
        spellCheck={true}
        autoFocus={false}
        underlineColorAndroid={theme.color.transparent}
        value={text}
        onChangeText={(_text) => {
          setText(_text);

          if (text) setTextError(false);
        }}
        style={styles.textInput}
      />

      {textError ? (
        <Text style={styles.textError}>You can't turn your goal empty!</Text>
      ) : null}
    </View>

    <View style={[styles.row, styles.rowIncrement]}>
      <Text style={[styles.text, styles.switchText]}>
        Is your goal incremental?
      </Text>

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

    {increment ? (
      <View style={[styles.row, styles.rowIncrementText]}>
        <TextInput
          placeholder="What's the increment label"
          placeholderTextColor={theme.color.gray.main}
          textAlign="left"
          multiline={false}
          spellCheck={true}
          autoFocus={false}
          maxLength={10}
          underlineColorAndroid={theme.color.transparent}
          value={incrementText}
          onChangeText={(text) => {
            setIncrementText(text);
          }}
          style={styles.textInput}
        />
      </View>
    ) : null}

    <View style={[styles.row, styles.rowRemind]}>
      <Text style={[styles.text, styles.switchText]}>
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
          When do you want to receive the reminders
        </Text>

        <Ionicons
          name="timer"
          size={26}
          color={theme.color.black.main}
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
            textColor={theme.color.black.main}
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
  </>
);

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
    marginBottom: 42,
  },
  rowText: {
    marginTop: 12,
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
    marginRight: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  switchText: {
    marginRight: 16,
  },
  rowIncrementText: {},
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
  timePickerIcon: {
    paddingVertical: 8,
    paddingLeft: 2,
    paddingRight: 12,
  },
  datePicker: {},
});

export default memo(Information);
