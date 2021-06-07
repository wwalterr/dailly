import React from "react";

import { Calendar } from "react-native-calendars";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const History = ({
  createdAt,
  completed,
  setCompleted = (value) => {},
  disableDayPressEvent = false,
}) => {
  const { isDark } = useSettings();

  const dates = Object.keys(completed).map((key) =>
    moment(key).format("YYYY-MM-DD")
  );

  const calendarDates = dates.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: {
        selected: true,
        selectedColor: isDark
          ? theme.color.white.main
          : theme.color.black.light,
        marked: false,
      },
    }),
    {}
  );

  const createdAtParsed = moment(createdAt).format("YYYY-MM-DD");

  return (
    <Calendar
      markedDates={{
        ...calendarDates,
        [createdAtParsed]: {
          marked: true,
          ...(createdAtParsed in completed && completed[createdAtParsed]
            ? {
                selected: true,
                selectedColor: isDark
                  ? theme.color.white.main
                  : theme.color.black.light,
                dotColor: isDark
                  ? theme.color.black.main
                  : theme.color.white.main,
              }
            : {}),
          customStyles: {
            text: {
              fontWeight: "bold",
            },
          },
        },
      }}
      enableSwipeMonths={false}
      disableAllTouchEventsForDisabledDays={true}
      showWeekNumbers={false}
      hideExtraDays={true}
      hideDayNames={false}
      minDate={createdAtParsed}
      onDayPress={(day) => {
        if (disableDayPressEvent) return;

        if (completed[day.dateString]) {
          const { [day.dateString]: omit, ..._completed } = completed;

          setCompleted(_completed);
        } else {
          setCompleted({ ...completed, [day.dateString]: true });
        }
      }}
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
        todayTextColor: isDark
          ? theme.color.white.main
          : theme.color.black.main,
        dayTextColor: isDark ? theme.color.white.main : theme.color.black.soft,
        textDisabledColor: isDark
          ? theme.color.gray.dark
          : theme.color.gray.soft,
        dotColor: isDark ? theme.color.white.main : theme.color.black.light,
        selectedDotColor: isDark
          ? theme.color.white.main
          : theme.color.black.main,
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
  );
};

export default History;
