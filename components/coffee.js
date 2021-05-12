import React, { useEffect, useState } from "react";

import { View, Text, Picker, StyleSheet } from "react-native";

import { PaymentsStripe as Stripe } from "expo-payments-stripe";

import theme from "../theme";

import { STRIPE_PUBLIC_KEY } from "@env";

import PaymentCard from "./paymentCard";

const Coffee = () => {
  const [coffeePrice, setCoffeePrice] = useState("500");

  useEffect(() => {
    // Setup Stripe
    Stripe.setOptionsAsync({
      publishableKey: STRIPE_PUBLIC_KEY,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Buy us a coffee so we can stay awake and create new features{" "}
        <Text style={{ fontSize: 22 }}>☕</Text>
      </Text>

      <View style={styles.pickerQuestionContainer}>
        <Text style={[styles.text, styles.textQuestion]}>Choose a coffee:</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={coffeePrice}
            onValueChange={(itemValue, itemIndex) => setCoffeePrice(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Freshly Brewed 1$" value="100" />

            <Picker.Item label="Frappuccino 2$" value="200" />

            <Picker.Item label="Mocha Frappuccino 3$" value="300" />

            <Picker.Item label="Iced Caramel Macchiato 4$" value="400" />

            <Picker.Item label="Pumpkin Spice Latte 5$" value="500" />
          </Picker>
        </View>
      </View>

      <PaymentCard
        coffeePrice={parseInt(coffeePrice)}
        setCoffeePrice={setCoffeePrice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32,
  },
  text: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginTop: 16,
    textAlign: "justify",
  },
  textEmoji: {
    fontSize: 22,
  },
  pickerQuestionContainer: {
    flexDirection: "column",
  },
  textQuestion: {
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: theme.color.white.main,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.color.black.main,
  },
  picker: {
    height: 45,
    width: "100%",
    color: theme.color.black.main,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
});

export default Coffee;
