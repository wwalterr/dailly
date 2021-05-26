import React from "react";

import { Calendar } from "react-native-calendars";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

const History = ({ task }) => {
  const { isDark } = useSettings();

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

  return (
    <Calendar
      markedDates={calendarDates}
      enableSwipeMonths={false}
      disableAllTouchEventsForDisabledDays={false}
      showWeekNumbers={false}
      hideExtraDays={true}
      hideDayNames={false}
      minDate={moment(task.createdAt).format("YYYY-MM-DD")}
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
        dayTextColor: isDark ? theme.color.white.main : theme.color.black.main,
        textDisabledColor: theme.color.gray.soft,
        dotColor: isDark ? theme.color.white.main : theme.color.black.light,
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
  );
};

export default History;
