import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Linking,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Clipboard from "@react-native-community/clipboard";

import theme from "../theme";

import generateRandomCode from "../utils/random";

import { limitText, capitalize } from "../utils/text";

import { schedulePushNotification } from "../utils/notifications";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import HeaderGoBack from "../components/headerGoBack";

const messageCopyGoals = "Goals exported!";

const messagePasteGoals = "Goals imported!";

const BackupScreen = ({ navigation }) => {
  const { isDark } = useSettings();

  const { tasks, importTasks } = useTasks();

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark ? { backgroundColor: theme.color.black.main } : {},
      ]}
    >
      <HeaderGoBack navigation={navigation} />

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Control
        </Text>

        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          and secure
        </Text>

        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          your goals
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.action}>
          <Text
            style={[
              styles.subTitle,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Export
          </Text>

          <Text
            style={[
              styles.description,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Press the export export to copy your goals
          </Text>

          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(JSON.stringify(tasks));

              if (Platform.OS === "android")
                ToastAndroid.show(messageCopyGoals, ToastAndroid.SHORT);
            }}
            activeOpacity={0.8}
            key={"export"}
            style={[
              styles.button,
              isDark ? { backgroundColor: theme.color.black.light } : {},
            ]}
          >
            <MaterialCommunityIcons
              name="export-variant"
              size={22}
              color={isDark ? theme.color.white.main : theme.color.black.main}
              style={styles.buttonIcon}
            />

            <Text
              style={[
                styles.buttonText,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              Export
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <Text
            style={[
              styles.subTitle,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Import
          </Text>

          <Text
            style={[
              styles.description,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            Copy your goals and press the import button
          </Text>

          <TouchableOpacity
            onPress={async () => {
              let text;

              try {
                text = await Clipboard.getString();
              } catch (error) {
                if (Platform.OS === "android")
                  ToastAndroid.show(error.message, ToastAndroid.SHORT);

                return;
              }

              let textParsed;

              try {
                textParsed = JSON.parse(text);
              } catch (error) {
                if (Platform.OS === "android")
                  ToastAndroid.show(error.message, ToastAndroid.SHORT);

                return;
              }

              const _tasks = [];

              textParsed.forEach(async (task) => {
                let identifier;

                const date = new Date(
                  task.remindTime ? task.remindTime : task.createdAt
                );

                if (task.remind) {
                  // Async await or scope causes a undefined error,
                  // review the notification API
                  schedulePushNotification(
                    {
                      title: `Check your goal ${
                        task.emoji.emoji ? task.emoji.emoji : ""
                      }`,
                      body: capitalize(limitText(task.text, 34)),
                      vibrate: true,
                    },
                    {
                      hour: date.getHours(),
                      minute: date.getMinutes(),
                      repeats: true,
                    }
                  )
                    .then((response) => {
                      identifier = response;
                    })
                    .catch((error) => {});
                }

                _tasks.push({
                  ...task,
                  id: generateRandomCode(),
                  ...(task.remind ? { identifier } : {}),
                  ...(task.remind ? { remindTime: date.getTime() } : {}),
                });
              });

              importTasks(_tasks);

              if (Platform.OS === "android")
                ToastAndroid.show(messagePasteGoals, ToastAndroid.SHORT);
            }}
            activeOpacity={0.8}
            key={"import"}
            style={[
              styles.button,
              isDark ? { backgroundColor: theme.color.black.light } : {},
            ]}
          >
            <MaterialCommunityIcons
              name="import"
              size={22}
              color={isDark ? theme.color.white.main : theme.color.black.main}
              style={styles.buttonIcon}
            />

            <Text
              style={[
                styles.buttonText,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              Import
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.openSource}>
          <Text
            style={[
              styles.textOpenSource,
              isDark ? { color: theme.color.white.main } : {},
            ]}
          >
            See how your data is processed on
          </Text>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://github.com/hydroxion/dailly")
            }
            activeOpacity={0.8}
            key={"openSource"}
            style={styles.buttonOpenSource}
          >
            <Text
              style={[
                styles.textButtonOpenSource,
                isDark ? { color: theme.color.white.main } : {},
              ]}
            >
              Github
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white.main,
  },
  header: {
    justifyContent: "center",
    flex: 0.45,
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 40,
    color: theme.color.black.main,
  },
  actions: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 32,
  },
  action: {},
  subTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    color: theme.color.black.main,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.gray.main,
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    backgroundColor: theme.color.black.main,
    width: 105,
    borderRadius: 5,
  },
  buttonIcon: {
    color: theme.color.white.main,
    marginVertical: 6,
    marginRight: 14,
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.white.main,
  },
  openSource: {
    flexDirection: "row",
    alignItems: "center",
  },
  textOpenSource: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.gray.main,
  },
  buttonOpenSource: {
    marginLeft: 4,
  },
  textButtonOpenSource: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.gray.main,
    textDecorationLine: "underline",
  },
});

export default BackupScreen;
