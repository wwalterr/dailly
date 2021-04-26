import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

const Header = ({ setNewTaskVisible }) => {
  const { tasks } = useTasks();

  const [options, setOptions] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.columnSlogan]}>
        <Text style={styles.textSlogan}>Plan /</Text>

        <Text style={styles.textSlogan}>Work /</Text>

        <Text style={styles.textSlogan}>Relax /</Text>

        <Entypo
          name="dots-three-horizontal"
          size={24}
          color="black"
          onPress={() => setOptions((previousOptions) => !previousOptions)}
        />
      </View>

      {!options ? (
        <View style={[styles.column, styles.columnPresentation]}>
          <View style={styles.columnPresentationContainer}>
            <Text style={styles.textAmountTasks}>{tasks.length}</Text>

            <Text style={styles.textAmountTasksDescription}>Goals</Text>
          </View>
        </View>
      ) : null}

      {options ? (
        <View style={[styles.column, styles.columnMenu]}>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Privacy</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
    justifyContent: "flex-end",
  },
  columnPresentationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textAmountTasks: {
    flex: 0.55,
    lineHeight: 85,
    fontFamily: "Inter_900Black",
    fontSize: 84,
    color: theme.color.black.main,
  },
  textAmountTasksDescription: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: theme.color.black.main,
  },
  columnMenu: {
    flex: 1.25,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  chip: {},
  chipText: {
    color: theme.color.black.main,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
});

export default Header;
