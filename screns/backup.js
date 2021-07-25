import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Platform,
  Alert,
  Pressable,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Clipboard from "@react-native-community/clipboard";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import {
  GDrive,
  ListQueryBuilder,
  MimeTypes,
} from "@robinbobin/react-native-google-drive-api-wrapper";

import { GCP_WEB_CLIENT_ID } from "@env";

import theme from "../theme";

import generateRandomCode from "../utils/random";

import ISODateString from "../utils/dates";

import { limitText, capitalize } from "../utils/text";

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import HeaderGoBack from "../components/headerGoBack";

const messageSignedIn = "You've signed in";

const messageSignedOut = "You've signed out";

const messageCopyGoals = "Goals exported";

const messagePasteGoals = "Goals imported";

const messageResetGoal = "Goals reset";

const exportTasks = (tasks) => {
  Clipboard.setString(JSON.stringify(tasks));

  if (Platform.OS === "android")
    ToastAndroid.show(messageCopyGoals, ToastAndroid.SHORT);
};

const importTasks = async (tasks, createTasks) => {
  const _tasks = tasks.map(async (task) => {
    let identifier;

    const date = new Date(task.remindTime ? task.remindTime : task.createdAt);

    if (task.remind) {
      // Async await or scope causes a undefined error,
      // review the notification API
      try {
        identifier = await schedulePushNotification(
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
        );
      } catch (error) {}
    }

    return {
      ...task,
      id: generateRandomCode(),
      ...(task.remind ? { identifier } : {}),
      ...(task.remind ? { remindTime: date.getTime() } : {}),
    };
  });

  createTasks(await Promise.all(_tasks));

  if (Platform.OS === "android")
    ToastAndroid.show(messagePasteGoals, ToastAndroid.SHORT);
};

const signIn = async (setIsSigninInProgress, setIsSignedIn) => {
  setIsSigninInProgress(true);

  try {
    await GoogleSignin.hasPlayServices();

    // User profile information
    await GoogleSignin.signIn();

    setIsSignedIn(true);

    if (Platform.OS === "android")
      ToastAndroid.show(messageSignedIn, ToastAndroid.SHORT);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("User cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert("Operation (e.g. sign in) is in progress already");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert("Play Services not available or outdated");
    } else {
      Alert.alert("Some other error ", error.message);
    }
  }

  setIsSigninInProgress(false);
};

signOut = async (setIsSignedIn, setIsSignoutInProgress) => {
  setIsSignoutInProgress(true);

  try {
    await GoogleSignin.revokeAccess();

    await GoogleSignin.signOut();

    setIsSignedIn(false);

    if (Platform.OS === "android")
      ToastAndroid.show(messageSignedOut, ToastAndroid.SHORT);
  } catch (error) {
    Alert.alert(error.message);
  }

  setIsSignoutInProgress(false);
};

const BackupScreen = ({ navigation }) => {
  const { isDark } = useSettings();

  const { tasks, createTasks, resetTasks } = useTasks();

  const [resetStatus, setResetStatus] = useState(false);

  const [isSignedIn, setIsSignedIn] = useState(false);

  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const [isSignoutInProgress, setIsSignoutInProgress] = useState(false);

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive"],
    webClientId: GCP_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  useEffect(() => {
    (async () => {
      setIsSignedIn(await GoogleSignin.isSignedIn());
    })();
  }, []);

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

      <ScrollView style={styles.actions}>
        {/* Google Drive */}
        <View style={styles.action}>
          <View style={styles.actionHeader}>
            <Image
              style={styles.image}
              source={require("../assets/backup/googleDrive.png")}
            />

            <View style={styles.actionHeaderContent}>
              <Text style={styles.actionTitle}>Google Drive</Text>

              <Text style={styles.actionDescription}>
                Backup your data on cloud
              </Text>
            </View>
          </View>

          <View style={styles.actionBody}>
            {isSignedIn ? null : (
              <Pressable
                onPress={async () =>
                  signIn(setIsSigninInProgress, setIsSignedIn)
                }
                activeOpacity={0.8}
                key={"sign-in"}
                disabled={isSigninInProgress}
                style={[
                  styles.button,
                  isDark ? { backgroundColor: theme.color.black.light } : {},
                ]}
              >
                <Image
                  style={styles.buttonIconImage}
                  source={require("../assets/backup/google.png")}
                />

                <Text
                  style={[
                    styles.buttonText,
                    isDark ? { color: theme.color.white.main } : {},
                  ]}
                >
                  Sign in
                </Text>
              </Pressable>
            )}

            {isSignedIn ? (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    const gdrive = new GDrive();

                    try {
                      gdrive.accessToken = (
                        await GoogleSignin.getTokens()
                      ).accessToken;

                      const id = (
                        await gdrive.files
                          .newMultipartUploader()
                          .setData(
                            JSON.stringify(JSON.stringify(tasks)),
                            MimeTypes.JSON
                          )
                          .setRequestBody({
                            name: "dailly.json",
                            description: "Backup for Dailly mobile application",
                            createdTime: ISODateString(new Date()),
                          })
                          .setIsBase64()
                          .execute()
                      ).id;

                      if (Platform.OS === "android")
                        ToastAndroid.show(messageCopyGoals, ToastAndroid.SHORT);
                    } catch (error) {
                      Alert.alert(error.message);
                    }
                  }}
                  activeOpacity={0.8}
                  key={"export-google-drive"}
                  style={[
                    styles.button,
                    isDark ? { backgroundColor: theme.color.black.light } : {},
                  ]}
                >
                  <Ionicons
                    name="arrow-up"
                    size={22}
                    color={
                      isDark ? theme.color.white.main : theme.color.black.main
                    }
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

                <TouchableOpacity
                  onPress={async () => {
                    const gdrive = new GDrive();

                    gdrive.accessToken = (
                      await GoogleSignin.getTokens()
                    ).accessToken;

                    try {
                      const fileId = (
                        await gdrive.files.list({
                          q: new ListQueryBuilder().e("name", "dailly.json"),
                        })
                      ).files[0].id;

                      const file = await gdrive.files.getJson(
                        fileId,
                        null,
                        "1-1"
                      );

                      importTasks(JSON.parse(file), createTasks);

                      if (Platform.OS === "android")
                        ToastAndroid.show(
                          messagePasteGoals,
                          ToastAndroid.SHORT
                        );
                    } catch (error) {
                      Alert.alert(error.message);
                    }
                  }}
                  activeOpacity={0.8}
                  key={"import-google-drive"}
                  style={[
                    styles.button,
                    isDark ? { backgroundColor: theme.color.black.light } : {},
                  ]}
                >
                  <Ionicons
                    name="arrow-down"
                    size={22}
                    color={
                      isDark ? theme.color.white.main : theme.color.black.main
                    }
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
              </>
            ) : null}
          </View>
        </View>

        {/* Local */}
        <View style={styles.action}>
          <View style={styles.actionHeader}>
            <Image
              style={styles.image}
              source={require("../assets/backup/smartphone.png")}
            />

            <View style={styles.actionHeaderContent}>
              <Text style={styles.actionTitle}>Local</Text>

              <Text style={styles.actionDescription}>
                Backup your data on your smartphone
              </Text>
            </View>
          </View>

          <View style={styles.actionBody}>
            <TouchableOpacity
              onPress={() => exportTasks(tasks)}
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

            <TouchableOpacity
              onPress={async () => {
                let _tasks;

                try {
                  _tasks = JSON.parse(await Clipboard.getString());
                } catch (error) {
                  if (Platform.OS === "android")
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);

                  return;
                }

                importTasks(_tasks, createTasks);
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
        </View>

        {/* Clean */}
        <View style={styles.clean}>
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

          <Text style={styles.highlight}>•</Text>

          <Pressable
            onPress={async () => signOut(setIsSignedIn, setIsSignoutInProgress)}
            activeOpacity={0.8}
            key={"sign-out"}
            disabled={isSignoutInProgress}
            style={[
              styles.button,
              isDark ? { backgroundColor: theme.color.black.light } : {},
            ]}
          >
            <Text
              style={[
                styles.reset,
                {
                  color: isDark
                    ? theme.color.white.main
                    : theme.color.gray.main,
                },
              ]}
            >
              Sign out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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
    paddingHorizontal: 32,
  },
  action: {},
  actionHeader: {},
  image: {},
  actionHeaderContent: {},
  actionTitle: {},
  actionDescription: {},
  actionBody: {},
  button: {},
  buttonIcon: {},
  buttonIconImage: {},
  buttonText: {},
  clean: {
    flexDirection: "row",
    alignItems: "center",
  },
  highlight: {
    marginTop: -16,
    marginHorizontal: 8,
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
