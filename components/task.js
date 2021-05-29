import React, { useState, useEffect } from "react";

import {
  View,
  ScrollView,
  Text,
  Share,
  Animated,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import Modal from "react-native-modal";

import Clipboard from "@react-native-community/clipboard";

import { AnimatedEmoji } from "react-native-animated-emoji";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import { cancelPushNotification } from "../utils/notifications";

import removeObjectKey from "../utils/objects";

import { limitText } from "../utils/text";

import Close from "./close";

const taskMargin = 16;

const taskPadding = 20;

const taskHeight = 145 + taskMargin * 2;

const messageRemoveGoal = "Goal removed!";

const messageComplete = "Goal completed!";

const messageIncomplete = "Goal incomplete!";

const messageCopyGoal = "Goal copied!";

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
  const { settings, isDark } = useSettings();

  const { removeTask, updateTask } = useTasks();

  const [removeStatus, setRemoveStatus] = useState(false);

  const [showTextModal, setShowTextModal] = useState(false);

  const [emojiCloud, setEmojiCloud] = useState(false);

  const cardFontColor = { color: task.cardFontColor };

  const taskHeightCardSetting =
    Dimensions.get("window").height / 4 + taskMargin * 2;

  const _taskHeight = settings.card ? taskHeightCardSetting : taskHeight;

  const scale = scrollY.interpolate({
    inputRange: [-1, 0, _taskHeight * index, _taskHeight * (index + 2)],
    outputRange: [1, 1, 1, 0],
  });

  const opacity = scrollY.interpolate({
    inputRange: [-1, 0, _taskHeight * index, _taskHeight * (index + 0.25)],
    outputRange: [1, 1, 1, 0],
  });

  const today = moment().format("YYYY-MM-DD");

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
        settings.card
          ? {
              marginHorizontal: 0,
              marginVertical: 0,
              borderRadius: 0,
              minHeight: taskHeight,
              height: taskHeightCardSetting,
            }
          : {},
      ]}
    >
      <View style={styles.containerHeader}>
        <Text style={[styles.createdAt, cardFontColor]}>
          {moment(task.createdAt).format("MM/DD/YYYY")}
        </Text>

        <TouchableOpacity
          onPress={() => {
            setEmojiCloud(true);
          }}
          activeOpacity={0.8}
          key={"emoji"}
        >
          <Text style={styles.emoji}>{task.emoji.emoji}</Text>
        </TouchableOpacity>

        {emojiCloud ? (
          <>
            <AnimatedEmoji
              index={index}
              style={{ bottom: 0 }}
              name={task.emoji.aliases[0]}
              size={25}
              duration={3500}
              onAnimationCompleted={() => {}}
            />

            <AnimatedEmoji
              index={index + 1}
              style={{ bottom: 40 }}
              name={task.emoji.aliases[0]}
              size={15}
              duration={3500}
              onAnimationCompleted={() => {}}
            />

            <AnimatedEmoji
              index={index + 2}
              style={{ bottom: -60 }}
              name={task.emoji.aliases[0]}
              size={25}
              duration={3550}
              onAnimationCompleted={() => {
                setEmojiCloud(false);
              }}
            />
          </>
        ) : null}
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
                  {limitText(task.text, settings.card ? 44 : 34)}
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(task.text);

                    if (Platform.OS === "android")
                      ToastAndroid.show(messageCopyGoal, ToastAndroid.SHORT);
                  }}
                  activeOpacity={0.8}
                  key={"text-modal-copy"}
                >
                  <Text
                    style={[
                      styles.textModal,
                      isDark ? { color: theme.color.white.main } : {},
                    ]}
                  >
                    {task.text}
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.containerModalActions}>
                <Close
                  hide={() => {
                    setShowTextModal(false);
                  }}
                />
              </View>
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

            <TouchableOpacity
              onPress={async () => {
                if (!task.completed[today]) {
                  updateTask(task.id, {
                    ...task,
                    completed: {
                      ...task.completed,
                      [moment().format("YYYY-MM-DD")]: true,
                    },
                  });

                  if (Platform.OS === "android")
                    ToastAndroid.show(messageComplete, ToastAndroid.SHORT);
                } else {
                  if (Object.keys(task.completed).length) {
                    updateTask(task.id, {
                      ...task,
                      completed: removeObjectKey(
                        moment().format("YYYY-MM-DD"),
                        task.completed
                      ),
                    });
                  }

                  // React Native looses reference if this call
                  // is made inside the if above, scope problem
                  if (Platform.OS === "android")
                    ToastAndroid.show(messageIncomplete, ToastAndroid.SHORT);
                }
              }}
              activeOpacity={0.8}
              key={"complete"}
              style={styles.completeButton}
            >
              <Text style={[styles.complete, cardFontColor]}>
                {task.completed[today] ? "Mark as incomplete" : "Complete"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    opacity: 1,
    color: "#000000",
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
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 32,
  },
  containerModalActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 14,
  },
  textModal: {
    fontFamily: "Inter_400Regular",
    fontSize: 24,
    color: theme.color.black.main,
  },
  containerActions: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  completeButton: {
    paddingVertical: 12,
  },
  complete: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
});

export default Task;
