import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

const Header = ({ newTaskButton }) => {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.columnSlogan]}>
        <View style={styles.columnSloganTexts}>
          <Text style={styles.textSlogan}>Plan /</Text>

          <Text style={styles.textSlogan}>Work /</Text>

          <Text style={styles.textSlogan}>Relax /</Text>
        </View>

        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </View>

      <View style={[styles.column, styles.columnPresentation]}>
        <View style={styles.columnPresentationContainer}>
          <Text style={styles.textAmountTasks}>{tasks.length}</Text>

          <Text style={styles.textAmountTasksDescription}>
            {tasks.length === 1 ? "Goal" : "Goals"}
          </Text>
        </View>

        <View style={styles.columnNewTaskContainer}>{newTaskButton}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    minHeight: 175,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  column: {
    flex: 1,
  },
  columnSlogan: {
    justifyContent: "space-between",
  },
  columnSloganTexts: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  textSlogan: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: theme.color.black.main,
  },
  columnPresentation: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  columnPresentationContainer: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  textAmountTasks: {
    flex: 0.75,
    lineHeight: 90,
    fontFamily: "Inter_900Black",
    fontSize: 90,
    color: theme.color.black.main,
  },
  textAmountTasksDescription: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: theme.color.black.main,
  },
  columnNewTaskContainer: {
    flex: 0.25,
    justifyContent: "flex-end",
    paddingBottom: 2,
    borderBottomWidth: 4,
    borderBottomColor: theme.color.black.main,
  },
});

export default Header;
