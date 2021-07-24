import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Clipboard from "@react-native-community/clipboard";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { GCP_WEB_CLIENT_ID } from "@env";

import theme from "../theme";

import generateRandomCode from "../utils/random";

import { limitText, capitalize } from "../utils/text";

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import HeaderGoBack from "../components/headerGoBack";

const messageCopyGoals = "Goals exported";

const messagePasteGoals = "Goals imported";

const messageResetGoal = "Goals reset";

const BackupScreen = ({ navigation }) => {
  const { isDark } = useSettings();

  const { tasks, importTasks, resetTasks } = useTasks();

  const [resetStatus, setResetStatus] = useState(false);

  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive"],
    // prettier-ignore
    webClientId: GCP_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  useEffect(() => {
    let closeResetStatus;

    if (resetStatus)
      closeResetStatus = setTimeout(() => {
        setResetStatus(false);
      }, 2500);

    return () => {
      clearTimeout(closeResetStatus);
    };
  }, [resetStatus, setResetStatus]);

  const signIn = async () => {
    setIsSigninInProgress(true);

    try {
      await GoogleSignin.hasPlayServices();

      // User profile information
      await GoogleSignin.signIn();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Operation (e.g. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services not available or outdated");
      } else {
        console.log("Some other error", error.message);
      }
    }

    setIsSigninInProgress(false);
  };

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
            Press the export button to copy your goals
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
            <Ionicons
              name="arrow-up"
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

          <GoogleSigninButton
            style={{ width: 130, height: 48, marginTop: 8, elevation: 0 }}
            size={GoogleSigninButton.Size.Standard}
            color={
              isDark
                ? GoogleSigninButton.Color.Dark
                : GoogleSigninButton.Color.Light
            }
            onPress={signIn}
            disabled={isSigninInProgress}
          />
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
                      title: `Achieve your goal ${
                        task.emoji.emoji ? task.emoji.emoji : ""
                      }`,
                      body: capitalize(limitText(task.text, 36)),
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
            <Ionicons
              name="arrow-down"
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

        <TouchableOpacity
          onPress={async () => {
            if (!resetStatus) {
              setResetStatus(true);

              return;
            }

            try {
              const promises = [];

              for (const task of tasks) {
                promises.push(cancelPushNotification(task.identifier));
              }

              await Promise.all(promises);

              await resetTasks();
            } catch (error) {
              if (Platform.OS === "android")
                ToastAndroid.show(error.message, ToastAndroid.SHORT);

              return;
            }

            if (Platform.OS === "android")
              ToastAndroid.show(messageResetGoal, ToastAndroid.SHORT);

            if (navigation.canGoBack()) navigation.goBack();
          }}
          activeOpacity={0.8}
          key={"reset"}
          style={styles.resetButton}
        >
          <Text
            style={[
              styles.reset,
              resetStatus
                ? { color: theme.color.red.main }
                : {
                    color: isDark
                      ? theme.color.white.main
                      : theme.color.gray.main,
                  },
            ]}
          >
            {resetStatus ? "Confirm reset" : "Reset goals"}
          </Text>
        </TouchableOpacity>
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
    fontFamily: "Inter_600SemiBold",
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
  resetButton: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  reset: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.gray.main,
    marginBottom: 16,
  },
});

export default BackupScreen;
