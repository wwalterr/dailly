import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import { PRIVACY_POLICY } from "@env";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

const Header = ({ newTaskButton, navigation }) => {
  const { tasks } = useTasks();

  const [options, setOptions] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.columnSlogan]}>
        <View style={styles.columnSloganTexts}>
          <Text style={styles.textSlogan}>Plan /</Text>

          <Text style={styles.textSlogan}>Work /</Text>

          <Text style={styles.textSlogan}>Relax /</Text>
        </View>

        <Entypo
          name="dots-three-horizontal"
          size={24}
          color={theme.color.black.main}
          onPress={() => {
            setOptions((previousOptions) => !previousOptions);
          }}
        />
      </View>

      {options ? (
        <View style={[styles.column, styles.columnMenu]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contact")}
            activeOpacity={0.8}
            key={"contact"}
          >
            <Text style={styles.textMenu}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(PRIVACY_POLICY).catch((error) =>
                console.error("Couldn't load page", error)
              )
            }
            activeOpacity={0.8}
            key={"privacy-policy"}
          >
            <Text style={styles.textMenu}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!options ? (
        <View style={[styles.column, styles.columnPresentation]}>
          <View style={styles.columnPresentationContainer}>
            <Text style={styles.textAmountTasks}>{tasks.length}</Text>

            <Text style={styles.textAmountTasksDescription}>
              {tasks.length === 1 ? "Goal" : "Goals"}
            </Text>
          </View>

          <View style={styles.columnNewTaskContainer}>{newTaskButton}</View>
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
    alignItems: "flex-end",
  },
  textAmountTasks: {
    lineHeight: 90,
    fontFamily: "Inter_900Black",
    fontSize: 90,
    color: theme.color.black.main,
  },
  textAmountTasksDescription: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: theme.color.black.main,
    paddingRight: 4,
  },
  columnNewTaskContainer: {
    flex: 0.25,
    justifyContent: "flex-end",
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: theme.color.black.main,
  },
  columnMenu: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  textMenu: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
    marginTop: 16,
  },
});

export default Header;
