import React, { useState } from "react";

import {
  View,
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

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import EmojiPicker from "./emojiPicker";

const activeText = "Yes";

const inActiveText = "No";

const messageNewGoal = "Goal updated!";

const UpdateTask = ({ task, navigation }) => {
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

  const [cardColor, setCardColor] = useState(task.cardColor);

  const [showCardColor, setShowCardColor] = useState(false);

  const [cardFontColor, setCardFontColor] = useState(task.cardFontColor);

  const [showCardFontColor, setShowCardFontColor] = useState(false);

  const [colorError, setColorError] = useState(false);

  const renderCardColors =
    (setter, value) =>
    ({ item }) =>
      (
        <TouchableOpacity
          onPress={() => {
            setter(item);
          }}
          activeOpacity={0.8}
          key={item}
          style={[styles.colorPick, { backgroundColor: item }]}
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
        <Text style={styles.text}>Do you want to receive reminds?</Text>

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
            When do you want to receive the reminds
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

      <View style={[styles.row, styles.rowCardColors]}>
        <View style={styles.containerColor}>
          <Text style={styles.text}>Choose a color to the card</Text>

          <MaterialIcons
            name="invert-colors-on"
            size={26}
            color={theme.color.black.main}
            onPress={() => {
              setShowCardColor(
                (previousShowCardColor) => !previousShowCardColor
              );
            }}
          />
        </View>

        {showCardColor ? (
          <FlatList
            data={theme.cards}
            renderItem={renderCardColors(setCardColor, cardColor)}
            keyExtractor={(item) => item}
            horizontal={true}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListColors}
          />
        ) : null}

        {colorError ? (
          <Text style={styles.textError}>
            The card and the card' text can't be the same color!
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowFontColors]}>
        <View style={styles.containerColor}>
          <Text style={styles.text}>Choose a color to the card' text</Text>

          <MaterialIcons
            name="invert-colors-on"
            size={26}
            color={theme.color.black.main}
            onPress={() => {
              setShowCardFontColor(
                (previousShowCardFontColor) => !previousShowCardFontColor
              );
            }}
          />
        </View>

        {showCardFontColor ? (
          <FlatList
            data={theme.fonts}
            renderItem={renderCardColors(setCardFontColor, cardFontColor)}
            keyExtractor={(item) => item}
            horizontal={true}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListColors}
          />
        ) : null}

        {colorError ? (
          <Text style={styles.textError}>
            The card and the card' text can't be the same color!
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
              cardColor,
              cardFontColor,
            });

            if (Platform.OS != "android")
              Snackbar.show({
                text: messageNewGoal,
                duration: Snackbar.LENGTH_SHORT,
              });
            else ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

            resetFields();

            navigation.goBack();
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
    alignItems: "center",
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
  rowCardColors: {},
  containerColor: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatListColors: {},
  colorPick: {
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: 5,
    marginRight: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.color.gray.light,
  },
  highlight: {
    fontSize: 25,
    color: theme.color.white.main,
  },
  rowFontColors: {},
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
