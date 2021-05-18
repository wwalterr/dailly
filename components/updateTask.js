import React, { useState } from "react";

import {
  View,
  ScrollView,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";

import { Switch } from "react-native-switch";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import { limitText } from "../utils/text";

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import EmojiPicker from "./emojiPicker";

import Button from "./button";

const activeText = "Yes";

const inActiveText = "No";

const messageNewGoal = "Goal updated!";

const UpdateTask = ({ task, navigation }) => {
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

  const renderCardColors =
    (setter, value, setterVisible) =>
    ({ item }) =>
      (
        <TouchableOpacity
          onPress={() => {
            setter(item);

            if (setterVisible) setterVisible(false);
          }}
          activeOpacity={0.8}
          key={item}
          style={[
            styles.colorPick,
            {
              backgroundColor: item,
              borderWidth: item === theme.color.white.main ? 2 : 0,
            },
          ]}
        >
          {value === item ? (
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
      );

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
          <Text style={styles.textError}>You can't turn your goal empty</Text>
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
            placeholder="What is the increment label"
            placeholderTextColor={theme.color.gray.main}
            textAlign="left"
            multiline={false}
            spellCheck={true}
            autoFocus={false}
            maxLength={10}
            underlineColorAndroid="transparent"
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

      <View style={[styles.row, styles.rowCategory]}>
        <Text style={styles.textCategory}>Choose an emoji for your goal</Text>

        <EmojiPicker
          emoji={emoji}
          setEmoji={setEmoji}
          category={category}
          setCategory={setCategory}
        />
      </View>

      <View style={[styles.row, styles.rowCardColors]}>
        <View style={styles.containerColor}>
          <Text style={styles.text}>Choose the card color</Text>

          <MaterialIcons
            name="invert-colors"
            size={21}
            color={theme.color.black.main}
            onPress={() => {
              setShowCardColor(
                (previousShowCardColor) => !previousShowCardColor
              );
            }}
            style={styles.colorIcon}
          />
        </View>

        {showCardColor ? (
          <FlatList
            data={theme.color.cards}
            renderItem={renderCardColors(
              setCardColor,
              cardColor,
              setShowCardColor
            )}
            keyExtractor={(item) => item}
            horizontal={true}
            maxToRenderPerBatch={4}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListColors}
          />
        ) : null}

        {colorError ? (
          <Text style={styles.textError}>
            The card and the card' text can't have the same color!
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowFontColors]}>
        <View style={styles.containerColor}>
          <Text style={styles.text}>Choose the card text color</Text>

          <MaterialIcons
            name="invert-colors"
            size={21}
            color={theme.color.black.main}
            onPress={() => {
              setShowCardFontColor(
                (previousShowCardFontColor) => !previousShowCardFontColor
              );
            }}
            style={styles.colorIcon}
          />
        </View>

        {showCardFontColor ? (
          <FlatList
            data={theme.color.fonts}
            renderItem={renderCardColors(
              setCardFontColor,
              cardFontColor,
              setShowCardFontColor
            )}
            keyExtractor={(item) => item}
            horizontal={true}
            maxToRenderPerBatch={4}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListColors}
          />
        ) : null}

        {colorError ? (
          <Text style={styles.textError}>
            The card and the card' text can't have the same color!
          </Text>
        ) : null}
      </View>

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
                  title: `${emoji.emoji} Check your daily goal`,
                  body: limitText(text, 34),
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
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
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
  timePickerIcon: {},
  datePicker: {},
  rowCategory: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textCategory: {
    marginRight: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  rowCardColors: {},
  containerColor: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIcon: {
    backgroundColor: theme.color.black.main,
    borderRadius: 25,
    color: theme.color.white.main,
    padding: 1,
    marginLeft: 4,
  },
  flatListColors: {},
  colorPick: {
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: 5,
    marginRight: 18,
    marginTop: 8,
    borderColor: theme.color.gray.light,
  },
  highlight: {
    fontSize: 25,
    color: theme.color.white.main,
  },
  rowFontColors: {},
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
