import React, { useState, useEffect } from "react";

import {
  View,
  ScrollView,
  Text,
  Share,
  Animated,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import Modal from "react-native-modal";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import { cancelPushNotification } from "../utils/notifications";

import { limitText } from "../utils/text";

import Close from "./close";

const taskMargin = 16;

const taskPadding = 20;

const taskHeight = 145 + taskMargin * 2;

const messageRemoveGoal = "Goal removed!";

const messageDecreaseCounter = "No negative goals!";

const onShare = async (message) => {
  try {
    const result = await Share.share({
      message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Task = ({ task, index, scrollY, navigation }) => {
  const { isDark } = useSettings();

  const { removeTask, updateTask } = useTasks();

  const [removeStatus, setRemoveStatus] = useState(false);

  const [showTextModal, setShowTextModal] = useState(false);

  const cardFontColor = { color: task.cardFontColor };

  const scale = scrollY.interpolate({
    inputRange: [-1, 0, taskHeight * index, taskHeight * (index + 2)],
    outputRange: [1, 1, 1, 0],
  });

  const opacity = scrollY.interpolate({
    inputRange: [-1, 0, taskHeight * index, taskHeight * (index + 0.25)],
    outputRange: [1, 1, 1, 0],
  });

  useEffect(() => {
    let closeRemoveStatus;

    if (removeStatus)
      closeRemoveStatus = setTimeout(() => {
        setRemoveStatus(false);
      }, 2500);

    return () => {
      clearTimeout(closeRemoveStatus);
    };
  }, [removeStatus, setRemoveStatus]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? task.cardColor === theme.color.black.main
              ? theme.color.black.light
              : task.cardColor
            : task.cardColor,
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <View style={styles.containerHeader}>
        <Text style={[styles.createdAt, cardFontColor]}>{task.createdAt}</Text>

        <Text style={styles.emoji}>{task.emoji.emoji}</Text>
      </View>

      <View style={styles.containerOutsider}>
        <View style={styles.containerInsider}>
          <View style={styles.containerContent}>
            <View style={styles.containerText}>
              <TouchableOpacity
                onPress={() => {
                  setShowTextModal(true);
                }}
                activeOpacity={0.8}
                key={"text"}
                style={styles.textButton}
              >
                <Text style={[styles.text, cardFontColor]}>
                  {limitText(task.text, 34)}
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              isVisible={showTextModal}
              onBackButtonPress={() => {
                setShowTextModal(false);
              }}
              backdropColor={
                isDark ? theme.color.black.main : theme.color.white.main
              }
              backdropOpacity={1}
              backdropTransitionInTiming={350}
              backdropTransitionOutTiming={250}
              useNativeDriverForBackdrop={true}
              style={[
                styles.containerModal,
                isDark ? { backgroundColor: theme.color.black.main } : {},
              ]}
            >
              <View style={styles.containerModalActions}>
                <Close
                  hide={() => {
                    setShowTextModal(false);
                  }}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Text
                  style={[
                    styles.textModal,
                    isDark ? { color: theme.color.white.main } : {},
                  ]}
                >
                  {task.text}
                </Text>
              </ScrollView>
            </Modal>
          </View>

          <View style={styles.containerActions}>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={async () => {
                  if (!removeStatus) {
                    setRemoveStatus(true);

                    return;
                  }

                  if (task.remind)
                    await cancelPushNotification(task.identifier);

                  removeTask(task.id);

                  if (Platform.OS === "android")
                    ToastAndroid.show(messageRemoveGoal, ToastAndroid.SHORT);
                }}
                activeOpacity={0.8}
                key={"remove"}
                style={styles.removeButton}
              >
                <Text style={[styles.remove, cardFontColor]}>
                  {removeStatus ? "Confirm removal" : "Remove"}
                </Text>
              </TouchableOpacity>

              <Text style={[styles.highlight, cardFontColor]}>•</Text>

              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate("Update", task);
                }}
                activeOpacity={0.8}
                key={"update"}
                style={styles.updateButton}
              >
                <Text style={[styles.update, cardFontColor]}>Update</Text>
              </TouchableOpacity>

              <Text style={[styles.highlight, cardFontColor]}>•</Text>

              <TouchableOpacity
                onPress={async () => {
                  onShare(task.text);
                }}
                activeOpacity={0.8}
                key={"share"}
                style={styles.shareButton}
              >
                <Text style={[styles.share, cardFontColor]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {task.increment ? (
          <View
            style={[
              styles.containerCounter,
              task.incrementText ? {} : { justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                updateTask(task.id, {
                  ...task,
                  counter: task.counter + 1,
                });
              }}
              activeOpacity={0.8}
              key={"plus"}
              style={styles.counterPlus}
            >
              <Text style={[styles.plus, cardFontColor]}>+</Text>
            </TouchableOpacity>

            <Text style={[styles.counter, cardFontColor]}>{task.counter}</Text>

            <TouchableOpacity
              onPress={() => {
                if (task.counter >= 1) {
                  updateTask(task.id, {
                    ...task,
                    counter: task.counter - 1,
                  });
                } else {
                  if (Platform.OS === "android")
                    ToastAndroid.show(
                      messageDecreaseCounter,
                      ToastAndroid.SHORT
                    );
                }
              }}
              activeOpacity={0.8}
              key={"minus"}
              style={styles.counterMinus}
            >
              <Text style={[styles.minus, cardFontColor]}>-</Text>
            </TouchableOpacity>

            {task.incrementText ? (
              <Text style={[styles.incrementText, cardFontColor]}>
                {task.incrementText}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: taskHeight,
    justifyContent: "space-between",
    marginHorizontal: 22,
    marginVertical: taskMargin,
    borderRadius: 5,
    padding: taskPadding,
    backgroundColor: theme.color.black.main,
  },
  containerHeader: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createdAt: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: "Inter_300Light",
    fontSize: 14,
    color: theme.color.white.main,
  },
  emoji: {
    fontSize: 22,
  },
  containerOutsider: {
    flex: 1,
    flexDirection: "row",
  },
  containerInsider: {
    flex: 1,
    flexDirection: "column",
  },
  containerContent: {
    flex: 0.85,
    flexDirection: "row",
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
  },
  textButton: {},
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 26,
    color: theme.color.white.main,
  },
  containerModal: {
    flex: 1,
    backgroundColor: theme.color.white.main,
    margin: 0,
    paddingTop: 16,
    paddingBottom: 0,
    paddingHorizontal: 32,
  },
  containerModalActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 8,
  },
  textModal: {
    fontFamily: "Inter_400Regular",
    fontSize: 24,
    color: theme.color.black.main,
  },
  containerCounter: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 4,
  },
  counterPlus: {
    paddingHorizontal: 6,
  },
  plus: {
    fontFamily: "Inter_500Medium",
    fontSize: 21,
    color: theme.color.white.main,
  },
  counter: {
    fontFamily: "Inter_500Medium",
    fontSize: 21,
    color: theme.color.white.main,
    paddingHorizontal: 6,
  },
  counterMinus: {
    paddingHorizontal: 6,
  },
  minus: {
    fontFamily: "Inter_500Medium",
    fontSize: 21,
    color: theme.color.white.main,
    paddingRight: 2,
  },
  incrementText: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
  containerActions: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  removeButton: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  remove: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
  highlight: {
    marginLeft: 8,
    color: theme.color.white.main,
  },
  updateButton: {
    marginLeft: 8,
    paddingVertical: 12,
  },
  update: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
  shareButton: {
    paddingVertical: 12,
  },
  share: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
    marginLeft: 8,
  },
});

export default Task;
