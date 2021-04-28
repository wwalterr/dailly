import React, { useCallback } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";

import theme from "../theme";

import { emojisCategorized, emojisCategories } from "../utils/emojis";

const EmojiPicker = ({
  emoji,
  setEmoji,
  setEmojiError,
  category,
  setCategory,
}) => {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setEmoji(item);

          setEmojiError(false);
        }}
        activeOpacity={0.8}
        key={item.description}
        style={styles.emojiButton}
      >
        <Text style={styles.emoji}>{item.emoji}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={[styles.container, { height: category ? 70 : 25 }]}>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.containerChips}
      >
        {emojisCategories.map((_category) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (category !== _category) setCategory(_category);
                else setCategory("");
              }}
              activeOpacity={0.8}
              key={_category}
              style={[
                styles.chip,
                {
                  ...(category === _category
                    ? { backgroundColor: theme.color.blue.light }
                    : {}),
                },
              ]}
            >
              <Text style={styles.chipText}>{_category}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {category ? (
        <FlatList
          data={emojisCategorized[category]}
          renderItem={renderItem}
          keyExtractor={(item) => item.aliases[0]}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.flatListEmojis}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  containerChips: {
    height: 25,
    maxHeight: 25,
    paddingVertical: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  chip: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.color.blue.light,
  },
  chipText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: theme.color.gray.main,
  },
  flatListEmojis: {
    height: 45,
  },
  emojiButton: {},
  emoji: {
    fontSize: 25,
    marginRight: 10,
  },
});

export default EmojiPicker;
