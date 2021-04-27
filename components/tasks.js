import React from "react";

import { Animated, FlatList, StyleSheet } from "react-native";

import { useTasks } from "../contexts/tasks";

import Task from "./task";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Tasks = () => {
  const { tasks } = useTasks();

  const y = new Animated.Value(0);

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  return (
    <AnimatedFlatList
      data={tasks}
      renderItem={({ item, index }) => <Task task={item} index={index} y={y} />}
      keyExtractor={(item, index) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      {...{ onScroll }}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: "95%",
  },
});

export default Tasks;
