import React from "react";

import { Text } from "react-native";

import MaskedView from "@react-native-masked-view/masked-view";

import LinearGradient from "react-native-linear-gradient";

const GradientText = (properties) => {
  return (
    <MaskedView maskElement={<Text {...properties} />}>
      <LinearGradient
        colors={properties.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...properties} style={[properties.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
