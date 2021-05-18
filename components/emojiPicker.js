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
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";

import Modal from "react-native-modal";

import theme from "../theme";

import {
  emojisCategorized,
  emojisCategoriesFlattened,
  emojisCategories,
} from "../utils/emojis";

const searchEmoji = (emojis, term) => {
  return emojisCategoriesFlattened.find((item) =>
    item.aliases.includes(term.toLowerCase())
  );
};

const EmojiPicker = ({
  emoji,
  setEmoji,
  setEmojiError,
  category,
  setCategory,
}) => {
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const [showEmojiSearch, setShowEmojiSearch] = useState(false);

  const [emojiFilter, setEmojiFilter] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const closeModal = () => {
    setCategory("Smileys & Emotion");

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
        color={theme.color.black.main}
        onPress={() => setShowEmojiModal(true)}
        style={styles.emojiOpener}
      />

      <Modal
        isVisible={showEmojiModal}
        backdropColor={theme.color.white.main}
        backdropOpacity={1}
        backdropTransitionOutTiming={0}
        useNativeDriverForBackdrop={true}
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.containerActions}>
          {showEmojiSearch ? null : (
            <EvilIcons
              name="search"
              size={24}
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
                underlineColorAndroid="transparent"
                value={searchTerm}
                onChangeText={(_searchTerm) => {
                  setEmojiFilter([]);

                  setSearchTerm(_searchTerm);
                }}
                style={styles.textInput}
              />

              <MaterialCommunityIcons
                name="format-clear"
                size={20}
                color={theme.color.gray.dark}
                onPress={() => {
                  setEmojiFilter([]);

                  setSearchTerm("");
                }}
                style={styles.iconClearSearch}
              />
            </View>
          ) : null}

          <Text style={styles.emoji}>{emoji.emoji}</Text>

          <AntDesign
            name="close"
            size={20}
            onPress={closeModal}
            color={theme.color.gray.dark}
            style={styles.closeIcon}
          />
        </View>

        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.containerChips}
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
                    ? { backgroundColor: theme.color.blue.light }
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

                if (setEmojiError) setEmojiError(false);

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
    padding: 2,
  },
  containerModal: {
    justifyContent: "flex-start",
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
    padding: 4,
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
    height: 35,
    width: "75%",
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  iconClearSearch: {
    padding: 6,
  },
  closeIcon: {
    padding: 4,
  },
  containerChips: {
    height: 40,
    maxHeight: 40,
    paddingBottom: 8,
    marginBottom: 4,
  },
  chip: {
    height: 25,
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
