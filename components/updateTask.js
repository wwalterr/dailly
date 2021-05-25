import React, { useState } from "react";

import {
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Platform,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";

import { Calendar } from "react-native-calendars";

import { Ionicons } from "@expo/vector-icons";

import moment from "moment";

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

  const dates = Object.keys(task.completed).map((key) =>
    moment(key).format("YYYY-MM-DD")
  );

  const calendarDates = dates.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: {
        textColor: theme.color.black.main,
        selected: true,
        selectedColor: isDark
          ? theme.color.white.main
          : theme.color.black.light,
        marked: false,
        dotColor: isDark ? theme.color.white.main : theme.color.black.light,
        disabled: false,
        disableTouchEvent: false,
        activeOpacity: 1,
      },
    }),
    {}
  );

  const resetFields = () => {
    Keyboard.dismiss();

    setTextError(false);

    setColorError(false);
  };

  return (
    <View
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Make
        </Text>

        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          your goal
        </Text>

        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          remarkable
        </Text>
      </View>

      <View
        style={[
          styles.containerCards,
          isDark ? { backgroundColor: theme.color.black.main } : {},
        ]}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          style={styles.cards}
        >
          <ScrollView
            style={styles.card}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardInformation}>
              <Text
                style={[
                  styles.cardTitle,
                  isDark
                    ? {
                        color: theme.color.white.main,
                      }
                    : {},
                ]}
              >
                Information
              </Text>

              <View style={styles.cardIndicator}>
                <Text
                  style={[
                    styles.cardIndicatorTitle,
                    isDark
                      ? {
                          color: theme.color.white.main,
                        }
                      : {},
                  ]}
                >
                  Scroll
                </Text>

                <Ionicons
                  name="md-arrow-forward"
                  size={24}
                  color={
                    isDark ? theme.color.white.main : theme.color.black.main
                  }
                  style={styles.cardIcon}
                />
              </View>
            </View>

            <Information
              text={text}
              setText={setText}
              textError={textError}
              setTextError={setTextError}
              remind={remind}
              setRemind={setRemind}
              date={date}
              setDate={setDate}
              showTimePicker={showTimePicker}
              setShowTimePicker={setShowTimePicker}
            />
          </ScrollView>

          <ScrollView
            style={styles.card}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardInformation}>
              <Text
                style={[
                  styles.cardTitle,
                  isDark
                    ? {
                        color: theme.color.white.main,
                      }
                    : {},
                ]}
              >
                History
              </Text>
            </View>

            <Calendar
              markedDates={calendarDates}
              enableSwipeMonths={false}
              disableAllTouchEventsForDisabledDays={false}
              showWeekNumbers={false}
              hideExtraDays={true}
              hideDayNames={false}
              theme={{
                backgroundColor: theme.color.transparent,
                calendarBackground: theme.color.transparent,
                textSectionTitleColor: theme.color.gray.main,
                selectedDayBackgroundColor: isDark
                  ? theme.color.white.main
                  : theme.color.black.main,
                selectedDayTextColor: isDark
                  ? theme.color.black.main
                  : theme.color.white.main,
                todayTextColor: theme.color.blue.main,
                dayTextColor: isDark
                  ? theme.color.white.main
                  : theme.color.black.main,
                textDisabledColor: theme.color.gray.soft,
                dotColor: isDark
                  ? theme.color.white.main
                  : theme.color.black.light,
                selectedDotColor: theme.color.white.main,
                arrowColor: theme.color.gray.main,
                disabledArrowColor: theme.color.gray.light,
                monthTextColor: isDark
                  ? theme.color.white.main
                  : theme.color.black.main,
                textDayFontFamily: "Inter_400Regular",
                textMonthFontFamily: "Inter_400Regular",
                textDayHeaderFontFamily: "Inter_400Regular",
                textDayFontWeight: "200",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "200",
                textDayFontSize: 13,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </ScrollView>

          <ScrollView
            style={[styles.card, { marginRight: 0 }]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardInformation}>
              <Text
                style={[
                  styles.cardTitle,
                  isDark ? { color: theme.color.white.main } : {},
                ]}
              >
                Style
              </Text>
            </View>

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
          </ScrollView>
        </ScrollView>

        <View style={styles.rowButton}>
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
                    title: `Check your goal ${emoji.emoji ? emoji.emoji : ""}`,
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
                completed: task.completed,
                emoji,
                createdAt: task.createdAt,
                cardColor,
                cardFontColor,
              });

              if (Platform.OS === "android")
                ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

              resetFields();

              if (navigation.canGoBack()) navigation.goBack();
            }}
            text="Update goal"
            style={isDark ? { backgroundColor: theme.color.black.light } : {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 32,
  },
  header: {
    justifyContent: "center",
    flex: 0.3,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 40,
    color: theme.color.black.main,
  },
  containerCards: {
    flex: 0.65,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    borderRadius: 5,
    marginBottom: 32,
    backgroundColor: theme.color.white.main,
  },
  cards: {},
  card: {
    paddingTop: 38,
    height: "100%",
    width: Dimensions.get("window").width - 64,
    marginRight: 96,
    marginBottom: 16,
  },
  cardInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  cardTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: theme.color.black.main,
  },
  cardIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIndicatorTitle: {
    marginRight: 8,
    fontFamily: "Inter_300Light",
    fontSize: 16,
    color: theme.color.black.main,
  },
  cardIcon: {},
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
