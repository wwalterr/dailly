import React, { useState, useEffect, memo } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  EvilIcons,
} from "@expo/vector-icons";

import Modal from "react-native-modal";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import Close from "./close";

import {
  emojisCategorized,
  emojisCategoriesFlattened,
  emojisCategories,
} from "../utils/emojis";

const defaultEmoji = {};

const searchEmoji = (emojis, term) => {
  return emojisCategoriesFlattened.find((item) =>
    item.aliases.includes(term.toLowerCase().trim())
  );
};

const EmojiPicker = ({
  emoji,
  setEmoji,
  category,
  setCategory,
}) => {
  const { isDark } = useSettings();

  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const [showEmojiSearch, setShowEmojiSearch] = useState(false);

  const [emojiFilter, setEmojiFilter] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const closeModal = () => {
    setShowEmojiSearch(false);

    setEmojiFilter([]);

    setSearchTerm("");

    setShowEmojiModal(false);
  };

  useEffect(() => {
    if (searchTerm) {
      const emoji = searchEmoji(emojisCategorized, searchTerm);

      if (emoji) {
        setEmojiFilter((previousEmojiFilter) => [
          ...previousEmojiFilter,
          ...emoji.aliases,
        ]);

        setCategory(emoji.category);
      }
    }
  }, [searchTerm, setSearchTerm]);

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="emoji-emotions"
        size={26}
        color={isDark ? theme.color.white.main : theme.color.black.main}
        onPress={() => setShowEmojiModal(true)}
        style={styles.emojiOpener}
      />

      <Modal
        isVisible={showEmojiModal}
        backdropColor={isDark ? theme.color.black.main : theme.color.white.main}
        backdropOpacity={1}
        backdropTransitionInTiming={350}
        backdropTransitionOutTiming={250}
        useNativeDriverForBackdrop={true}
        style={[
          styles.containerModal,
          isDark ? { backgroundColor: theme.color.black.main } : {},
        ]}
      >
        <View
          style={[
            styles.containerActions,
            isDark ? { backgroundColor: theme.color.black.main } : {},
          ]}
        >
          {showEmojiSearch ? null : (
            <EvilIcons
              name="search"
              size={26}
              color={theme.color.gray.dark}
              onPress={() => setShowEmojiSearch(true)}
              style={styles.searchIcon}
            />
          )}

          {showEmojiSearch ? (
            <View style={styles.containerSearch}>
              <TextInput
                placeholder="Search"
                placeholderTextColor={theme.color.gray.main}
                textAlign="left"
                multiline={false}
                spellCheck={true}
                autoFocus={true}
                underlineColorAndroid={theme.color.transparent}
                value={searchTerm}
                onChangeText={(_searchTerm) => {
                  setEmojiFilter([]);

                  setSearchTerm(_searchTerm);
                }}
                style={[
                  styles.textInput,
                  isDark ? { color: theme.color.white.main } : {},
                ]}
              />

              <MaterialCommunityIcons
                name="format-clear"
                size={20}
                color={theme.color.gray.dark}
                onPress={() => {
                  if (searchTerm) {
                    setEmojiFilter([]);

                    setSearchTerm("");
                  }
                }}
                style={styles.clearSearchIcon}
              />
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              setEmoji(defaultEmoji);
            }}
            activeOpacity={0.8}
            key={"emoji-selected"}
          >
            <Text style={styles.emoji}>{emoji.emoji}</Text>
          </TouchableOpacity>

          <Close hide={closeModal} />
        </View>

        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
          style={[
            styles.containerChips,
            isDark ? { backgroundColor: theme.color.black.main } : {},
          ]}
        >
          {emojisCategories.map((_category) => (
            <TouchableOpacity
              onPress={() => {
                setCategory(_category);
              }}
              activeOpacity={0.8}
              key={_category}
              style={[
                styles.chip,
                {
                  ...(category === _category
                    ? {
                        backgroundColor: isDark
                          ? theme.color.black.light
                          : theme.color.blue.light,
                      }
                    : {}),
                },
              ]}
            >
              <Text style={styles.chipText}>{_category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
          style={isDark ? { backgroundColor: theme.color.black.main } : {}}
        >
          {(searchTerm
            ? emojisCategorized[category].filter((item) =>
                emojiFilter.includes(item.aliases[0])
              )
            : emojisCategorized[category]
          ).map((item) => (
            <TouchableOpacity
              onPress={() => {
                setEmoji(item);

                setEmojiFilter([]);

                setSearchTerm("");

                setShowEmojiSearch(false);

                setShowEmojiModal(false);
              }}
              activeOpacity={0.8}
              key={item.aliases[0]}
              style={styles.emojiButton}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  emojiOpener: {
    paddingVertical: 8,
    paddingLeft: 2,
    paddingRight: 12,
  },
  containerModal: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: theme.color.white.main,
  },
  containerActions: {
    minHeight: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    padding: 12,
    paddingLeft: 0,
  },
  containerSearch: {
    width: "35%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.color.blue.light,
  },
  textInput: {
    height: 30,
    width: "75%",
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  clearSearchIcon: {
    padding: 6,
  },
  containerChips: {
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    paddingBottom: 8,
    marginBottom: 4,
  },
  chip: {
    height: 22,
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
  emojiButton: {},
  emoji: {
    fontSize: 22,
    padding: 8,
  },
});

export default memo(EmojiPicker);
