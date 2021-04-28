import React, { memo } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";

import theme from "../theme";

import { emojisCategorized, emojisCategories } from "../utils/emojis";

const EmojiPicker = ({ emoji, setEmoji, category, setCategory }) => {
  return (
    <View style={[styles.container, { height: category !== "" ? 70 : 25 }]}>
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
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.containerEmojis}
        >
          {emojisCategorized[category].map((emoji) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setEmoji(emoji);
                }}
                activeOpacity={0.8}
                key={emoji.description}
                style={styles.emojiButton}
              >
                <Text style={styles.emoji}>{emoji.emoji}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  containerEmojis: {
    height: 45,
  },
  emojiButton: {},
  emoji: {
    fontSize: 25,
    marginRight: 10,
  },
});

export default memo(EmojiPicker);
