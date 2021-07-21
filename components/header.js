import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

const Header = ({ navigation, showNewTask }) => {
  const { isDark } = useSettings();

  const { tasks } = useTasks();

  const [options, setOptions] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.columnSlogan]}>
        <View style={styles.columnSloganTexts}>
          <Text
            style={[
              styles.textSlogan,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Plan /
          </Text>

          <Text
            style={[
              styles.textSlogan,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Work /
          </Text>

          <Text
            style={[
              styles.textSlogan,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Relax /
          </Text>
        </View>

        <Entypo
          name="dots-three-horizontal"
          size={24}
          color={
            options
              ? theme.color.gray.main
              : isDark
              ? theme.color.white.main
              : theme.color.black.main
          }
          style={styles.dotsIcon}
          onPress={() => {
            setOptions((previousOptions) => !previousOptions);
          }}
        />
      </View>

      {options ? (
        <View style={[styles.column, styles.columnMenu]}>
          <TouchableOpacity
            onPress={() => {
              setOptions((previousOptions) => !previousOptions);

              Linking.openURL("https://buy.stripe.com/fZe01e3TD87YgmcaEE");
            }}
            activeOpacity={0.8}
            key={"coffee"}
            style={styles.buttonAction}
          >
            <Text
              style={[
                styles.textMenu,
                isDark
                  ? {
                      color: theme.color.white.main,
                    }
                  : {},
              ]}
            >
              Coffee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOptions((previousOptions) => !previousOptions);

              navigation.navigate("Contact");
            }}
            activeOpacity={0.8}
            key={"contact"}
            style={styles.buttonAction}
          >
            <Text
              style={[
                styles.textMenu,
                isDark
                  ? {
                      color: theme.color.white.main,
                    }
                  : {},
              ]}
            >
              Contact
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOptions((previousOptions) => !previousOptions);

              navigation.navigate("Settings");
            }}
            activeOpacity={0.8}
            key={"settings"}
            style={styles.buttonAction}
          >
            <Text
              style={[
                styles.textMenu,
                isDark
                  ? {
                      color: theme.color.white.main,
                    }
                  : {},
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!options ? (
        <View style={[styles.column, styles.columnPresentation]}>
          <View style={styles.columnPresentationContainer}>
            <Text
              style={[
                styles.textAmountTasks,
                isDark
                  ? {
                      color: theme.color.white.main,
                    }
                  : {},
              ]}
            >
              {tasks.length}
            </Text>

            <Text
              style={[
                styles.textAmountTasksDescription,
                isDark
                  ? {
                      color: theme.color.white.main,
                    }
                  : {},
              ]}
            >
              {tasks.length === 1 ? "Goal" : "Goals"}
            </Text>
          </View>

          <View
            style={[
              styles.columnNewTaskContainer,
              isDark
                ? {
                    borderBottomColor: theme.color.white.main,
                  }
                : {},
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                showNewTask();
              }}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text
                style={[
                  styles.buttonText,
                  isDark
                    ? {
                        color: theme.color.white.main,
                      }
                    : {},
                ]}
              >
                New goal
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 4,
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
  dotsIcon: {
    marginTop: 2,
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
    paddingBottom: 4,
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
  button: {
    paddingTop: 12,
  },
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  buttonAction: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 4,
  },
});

export default Header;
