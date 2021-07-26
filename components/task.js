import React, { useState } from "react";

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

import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import Clipboard from "@react-native-community/clipboard";

import { AnimatedEmoji } from "react-native-animated-emoji";

import moment from "moment";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import removeObjectKey from "../utils/objects";

import { limitText } from "../utils/text";

import { cancelPushNotification } from "../utils/notifications";

import Close from "./close";

import Metrics from "./metrics";

const taskMargin = 14;

const taskPadding = 18;

const taskHeight = 150 + taskMargin * 2;

const messageComplete = "Goal completed";

const messageIncomplete = "Goal incomplete";

const messageCopyGoal = "Goal copied";

const messageRemoveGoal = "Goal completed and removed";

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

  const { updateTask, removeTask } = useTasks();

  const [showTextModal, setShowTextModal] = useState(false);

  const [showMetricsModal, setShowMetricsModal] = useState(false);

  const [emojiCloud, setEmojiCloud] = useState(false);

  const cardFontColor = { color: task.cardFontColor };

  const taskHeightCardSetting =
    Dimensions.get("window").height / 4 + taskMargin * 2;

  const taskHeighCard = settings.card ? taskHeightCardSetting : taskHeight;

  const scale = scrollY.interpolate({
    inputRange: [-1, 0, taskHeighCard * index, taskHeighCard * (index + 2)],
    outputRange: [1, 1, 1, 0],
  });

  const opacity = scrollY.interpolate({
    inputRange: [-1, 0, taskHeighCard * index, taskHeighCard * (index + 0.25)],
    outputRange: [1, 1, 1, 0],
  });

  const today = moment().format("YYYY-MM-DD");

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: task.cardColor,
          transform: [{ scale }],
          opacity,
        },
        settings.card
          ? {
              marginHorizontal: 0,
              marginVertical: 0,
              borderRadius: 0,
              paddingHorizontal: 32,
              marginTop: -2,
              minHeight: taskHeight,
              height: taskHeightCardSetting,
            }
          : {},
      ]}
    >
      <View style={styles.containerOutsider}>
        <View style={styles.containerInsider}>
          {task.emoji.emoji ? (
            <TouchableOpacity
              onPress={() => {
                setEmojiCloud(true);
              }}
              activeOpacity={0.8}
              key={"emoji"}
              style={{ marginRight: 8 }}
            >
              <Text style={styles.emoji}>{task.emoji.emoji}</Text>
            </TouchableOpacity>
          ) : null}

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
                <Text
                  style={[
                    styles.text,
                    cardFontColor,
                    { fontFamily: task.font },
                  ]}
                >
                  {limitText(task.text, 36)}
                </Text>
              </TouchableOpacity>
            </View>

            {emojiCloud ? (
              <>
                <AnimatedEmoji
                  index={index}
                  style={{ top: 0 }}
                  name={task.emoji.aliases[0]}
                  size={25}
                  duration={3500}
                  onAnimationCompleted={() => {}}
                />

                <AnimatedEmoji
                  index={index + 1}
                  style={{ top: 40 }}
                  name={task.emoji.aliases[0]}
                  size={15}
                  duration={3500}
                  onAnimationCompleted={() => {}}
                />

                <AnimatedEmoji
                  index={index + 2}
                  style={{ top: -60 }}
                  name={task.emoji.aliases[0]}
                  size={25}
                  duration={3550}
                  onAnimationCompleted={() => {
                    setEmojiCloud(false);
                  }}
                />
              </>
            ) : null}

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
                <TouchableOpacity
                  onPress={async () => {
                    onShare(task.text);
                  }}
                  activeOpacity={0.8}
                  key={"share"}
                  style={styles.shareButton}
                >
                  <Ionicons
                    name="share-social"
                    size={20}
                    color={theme.color.black.main}
                    style={[
                      styles.share,
                      isDark ? { color: theme.color.white.main } : {},
                    ]}
                  />
                </TouchableOpacity>

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
              <View style={styles.action}>
                <TouchableOpacity
                  onPress={() => {
                    setShowMetricsModal(true);
                  }}
                  activeOpacity={0.8}
                  key={"metrics"}
                  style={styles.actionButton}
                >
                  <MaterialIcons
                    name="graphic-eq"
                    size={18}
                    color={theme.color.black.main}
                    style={[styles.icon, cardFontColor]}
                  />

                  <Text style={[styles.metrics, cardFontColor]}>Metrics</Text>
                </TouchableOpacity>

                <Metrics
                  task={task}
                  showMetricsModal={showMetricsModal}
                  setShowMetricsModal={setShowMetricsModal}
                />
              </View>

              <View style={styles.action}>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate("Update", task);
                  }}
                  activeOpacity={0.8}
                  key={"update"}
                  style={styles.actionButton}
                >
                  <MaterialIcons
                    name="update"
                    size={18}
                    color={theme.color.black.main}
                    style={[styles.icon, cardFontColor]}
                  />

                  <Text style={[styles.update, cardFontColor]}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={async () => {
                if (settings.complete) {
                  if (task.remind)
                    await cancelPushNotification(task.identifier);

                  removeTask(task.id);

                  if (Platform.OS === "android")
                    ToastAndroid.show(messageRemoveGoal, ToastAndroid.SHORT);

                  return;
                }

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
              style={styles.actionButton}
            >
              {task.completed[today] ? (
                <Ionicons
                  name="checkmark-done-circle"
                  size={18}
                  color={theme.color.black.main}
                  style={[styles.icon, cardFontColor]}
                />
              ) : (
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={18}
                  color={theme.color.black.main}
                  style={[styles.icon, cardFontColor]}
                />
              )}

              <Text style={[styles.complete, cardFontColor]}>
                {task.completed[today]
                  ? settings.complete
                    ? "Remove"
                    : "Mark as incomplete"
                  : "Complete"}
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
  emoji: {
    fontSize: 18,
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
    flex: 0.7,
    flexDirection: "row",
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
  },
  textButton: {},
  text: {
    fontFamily: "Inter_500Medium",
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
  icon: {
    marginRight: 4,
  },
  containerModalActions: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
  },
  textModal: {
    fontFamily: "Inter_400Regular",
    fontSize: 24,
    color: theme.color.black.main,
  },
  containerActions: {
    flex: 0.3,
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
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  metrics: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: theme.color.white.main,
  },
  update: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: theme.color.white.main,
  },
  shareButton: {
    paddingVertical: 14,
  },
  share: {
    color: theme.color.gray.dark,
    marginLeft: 8,
  },
  complete: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: theme.color.white.main,
  },
});

export default Task;
