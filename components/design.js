import React, { memo } from "react";

import { View, Text, StyleSheet } from "react-native";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import EmojiPicker from "./emojiPicker";

import ColorPicker from "./colorPicker";

import FontPicker from "./fontPicker";

const Design = ({
  category,
  setCategory,
  emoji,
  setEmoji,
  font,
  setFont,
  showFont,
  setShowFont,
  cardColor,
  setCardColor,
  showCardColor,
  setShowCardColor,
  cardFontColor,
  setCardFontColor,
  showCardFontColor,
  setShowCardFontColor,
  colorError,
}) => {
  const { isDark } = useSettings();

  return (
    <>
      <View style={[styles.row, styles.rowCategory]}>
        <Text
          style={[
            styles.textCategory,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Choose an emoji for your goal
        </Text>

        <EmojiPicker
          emoji={emoji}
          setEmoji={setEmoji}
          category={category}
          setCategory={setCategory}
        />
      </View>

      <View style={[styles.row, styles.rowCardColors]}>
        <ColorPicker
          text="Choose the card color"
          showPicker={showCardColor}
          showPickerSetter={setShowCardColor}
          color={cardColor}
          colorSetter={setCardColor}
          colors={theme.color.cards}
        />

        {colorError ? (
          <Text style={styles.textError}>
            The card and the card text can't have the same color
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowFontColors]}>
        <ColorPicker
          text="Choose the card text color"
          showPicker={showCardFontColor}
          showPickerSetter={setShowCardFontColor}
          color={cardFontColor}
          colorSetter={setCardFontColor}
          colors={theme.color.cards}
        />

        {colorError ? (
          <Text style={styles.textError}>
            The card and the card text can't have the same color
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, styles.rowCardFont]}>
        <FontPicker
          text="Choose the card font"
          font={font}
          fontSetter={setFont}
          fonts={theme.fonts}
          showPicker={showFont}
          showPickerSetter={setShowFont}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
    marginBottom: 42,
  },
  textError: {
    paddingTop: 5,
    fontFamily: "Inter_300Light",
    fontSize: 10,
    color: theme.color.red.main,
  },
  rowCategory: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textCategory: {
    marginRight: 5,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
  },
  rowCardColors: {},
  rowCardFont: {},
  rowFontColors: {},
});

export default memo(Design);
