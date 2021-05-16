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

import { AnimatedEmoji } from "react-native-animated-emoji";

import Modal from "react-native-modal";

import { AntDesign } from "@expo/vector-icons";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import { cancelPushNotification } from "../utils/notifications";

import { limitText } from "../utils/text";

const taskMargin = 16;

const taskPadding = 20;

const taskHeight = 145 + taskMargin * 2;

const messageRemoveGoal = "Goal removed!";

const messageDecreaseCounter = "No negative goals!";

const onShare = async (message) => {
  try {
    const result = await Share.share({
      message: `My daily goal is ${message.toLowerCase()}`,
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
  const { removeTask, updateTask } = useTasks();

  const [emojiCloud, setEmojiCloud] = useState(false);

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
      }, 1500);

    return () => {
      clearTimeout(closeRemoveStatus);
    };
  }, [removeStatus, setRemoveStatus]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: task.cardColor,
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <View style={styles.containerHeader}>
        <Text style={[styles.createdAt, cardFontColor]}>{task.createdAt}</Text>

        <TouchableOpacity
          onPress={() => {
            setEmojiCloud(true);
          }}
          activeOpacity={0.8}
          key={"emoji"}
          style={styles.emojiButton}
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
                  if (task.text.length >= 34) setShowTextModal(true);
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

            <Modal isVisible={showTextModal} style={styles.containerModal}>
              <AntDesign
                name="close"
                size={20}
                onPress={() => {
                  setShowTextModal(false);
                }}
                color={theme.color.gray.dark}
                style={styles.closeIcon}
              />

              <ScrollView
                style={styles.containerTextModal}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.textModal}>{task.text}</Text>
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

                  if (Platform.OS != "android")
                    Snackbar.show({
                      text: messageRemoveGoal,
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  else ToastAndroid.show(messageRemoveGoal, ToastAndroid.SHORT);
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
              task.incrementText ? {} : { justifyContent: "center" },
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
                  if (Platform.OS != "android")
                    Snackbar.show({
                      text: messageDecreaseCounter,
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  else
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
  emojiButton: {},
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
  containerTextModal: {},
  closeIcon: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: 8,
    padding: 4,
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
    fontFamily: "Inter_400Regular",
    fontSize: 14,
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
  },
  update: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
  },
  shareButton: {},
  share: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: theme.color.white.main,
    marginLeft: 8,
  },
});

export default Task;
