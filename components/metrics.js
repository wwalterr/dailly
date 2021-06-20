import React from "react";

import { View, ScrollView, Image, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import Modal from "react-native-modal";

import Close from "./close";

import History from "./history";

const Metrics = ({ task, showMetricsModal, setShowMetricsModal }) => {
  const { isDark } = useSettings();

  const { tasks } = useTasks();

  const createdAt = moment(new Date(task.createdAt), "YYYY-MM-DD");

  const goalsCompletedDays = Object.entries(task.completed).filter(
    ([key, value]) => value
  ).length;

  const daysSinceCreated = Math.floor(
    (new Date() - new Date(task.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const goalsIncompleteDays = daysSinceCreated - goalsCompletedDays;

  const rank = tasks.map((_task) => ({
    [_task.id]: Object.keys(_task.completed).length,
    count: Object.keys(_task.completed).length,
  }));

  const rankSorted = rank.sort(function (a, b) {
    return b.count - a.count;
  });

  const rankGoal =
    rankSorted.findIndex((_task) => Object.keys(_task)[0] === task.id) + 1;

  return (
    <Modal
      isVisible={showMetricsModal}
      onBackButtonPress={() => {
        setShowMetricsModal(false);
      }}
      backdropColor={isDark ? theme.color.black.main : theme.color.white.main}
      backdropOpacity={1}
      backdropTransitionInTiming={350}
      backdropTransitionOutTiming={250}
      useNativeDriverForBackdrop={true}
      style={[
        styles.container,
        isDark ? { backgroundColor: theme.color.black.main } : {},
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.containerActions}>
          <Close hide={() => setShowMetricsModal(false)} />
        </View>

        <View
          style={[
            styles.containerCreated,
            isDark ? { borderBottomColor: theme.color.white.main } : {},
          ]}
        >
          <Text
            style={[
              styles.createdTitle,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Created{" "}
            <Text
              style={[
                styles.highlight,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              {createdAt.fromNow(true)}
            </Text>{" "}
            ago
          </Text>

          <Image
            style={[
              styles.createdImage,
              isDark ? { tintColor: theme.color.white.main } : {},
            ]}
            source={require("../assets/task/barCode.png")}
          />
        </View>

        <View style={styles.containerRank}>
          <View
            style={[
              styles.containerRankPosition,
              isDark ? { backgroundColor: theme.color.black.light } : {},
            ]}
          >
            <Text
              style={[
                styles.rankPosition,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              {rankGoal}º
            </Text>
          </View>

          <View
            style={[
              styles.containerRankTitle,
              isDark ? { borderColor: theme.color.black.light } : {},
            ]}
          >
            <Text
              style={[
                styles.rankTitle,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              {goalsCompletedDays ? "Most" : "Less"} completed goal
            </Text>
          </View>
        </View>

        <View style={styles.containerIncomplete}>
          <Ionicons
            name="checkmark-done-circle-outline"
            size={34}
            color={theme.color.black.main}
            style={[
              styles.incompleteIcon,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          />

          <Text
            style={[
              styles.incompleteTitle,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Incomplete{" "}
            <Text
              style={[
                styles.highlight,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              {goalsIncompleteDays < 0 ? 0 : goalsIncompleteDays}
            </Text>{" "}
            {goalsIncompleteDays === 1 ? "time" : "times"}
          </Text>
        </View>

        <View style={styles.containerCompleted}>
          <Ionicons
            name="checkmark-done-circle"
            size={34}
            color={theme.color.black.main}
            style={[
              styles.completedIcon,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          />

          <Text
            style={[
              styles.completedTitle,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Completed{" "}
            <Text
              style={[
                styles.highlight,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              {goalsCompletedDays}
            </Text>{" "}
            {goalsCompletedDays === 1 ? "time" : "times"}
          </Text>
        </View>

        <View style={styles.containerHistory}>
          <Text
            style={[
              styles.historyTitle,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            History
          </Text>

          <History
            createdAt={task.createdAt}
            completed={task.completed}
            disableDayPressEvent={true}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
    margin: 0,
    paddingTop: 4,
    paddingBottom: 0,
    paddingHorizontal: 32,
  },
  containerActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 14,
  },
  containerCreated: {
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: theme.color.black.main,
    marginBottom: 8,
  },
  createdTitle: {
    fontFamily: "Inter_300Light",
    fontSize: 20,
    color: theme.color.black.main,
    marginBottom: 16,
  },
  highlight: {
    fontFamily: "Inter_900Black",
    color: theme.color.black.main,
  },
  createdImage: {
    width: "100%",
    height: 60,
    marginBottom: 4,
  },
  containerIncomplete: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  incompleteIcon: {
    color: theme.color.black.main,
    marginRight: 8,
  },
  incompleteTitle: {
    fontFamily: "Inter_300Light",
    fontSize: 18,
    color: theme.color.black.main,
  },
  containerCompleted: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
  },
  completedIcon: {
    color: theme.color.black.main,
    marginRight: 8,
  },
  completedTitle: {
    fontFamily: "Inter_300Light",
    fontSize: 18,
    color: theme.color.black.main,
  },
  containerRank: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  containerRankPosition: {
    flex: 0.5,
    alignItems: "center",
    padding: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: theme.color.black.main,
  },
  rankPosition: {
    fontFamily: "Inter_900Black",
    fontSize: 15,
    color: theme.color.white.main,
  },
  containerRankTitle: {
    flex: 0.5,
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 6,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: theme.color.black.main,
  },
  rankTitle: {
    fontFamily: "Inter_300Light",
    fontSize: 14,
    color: theme.color.black.main,
  },
  containerHistory: {
    marginTop: 32,
  },
  historyTitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 20,
    color: theme.color.black.main,
    marginBottom: 20,
  },
});

export default Metrics;
