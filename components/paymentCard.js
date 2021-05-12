import React, { useState } from "react";

import { View, ToastAndroid, StyleSheet } from "react-native";

import { AnimatedEmoji } from "react-native-animated-emoji";

import { API_URL } from "@env";

import { PaymentsStripe as Stripe } from "expo-payments-stripe";

import axios from "axios";

import theme from "../theme";

import PaymentButton from "./paymentButton";

const messagePaymentCreated = "Payment created!";

const processCardDetails = async (cardInformation, setCardInformation) => {
  try {
    setCardInformation({ loading: true });

    const cardOptions = {
      requiredBillingAddressFields: "full",
      prefilledInformation: {
        billingAddress: {
          name: "Name",
          line1: "Line 1",
          line2: "Line 2",
          city: "City",
          state: "State",
          country: "Country",
          postalCode: "Postal Code",
        },
      },
    };

    // Gets token from Stripe payment process
    const token = await Stripe.paymentRequestWithCardFormAsync(cardOptions);

    setCardInformation({ loading: false, token });
  } catch (error) {
    // console.log(error.message);

    if (Platform.OS != "android")
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    else ToastAndroid.show(error.message, ToastAndroid.SHORT);

    setCardInformation({ loading: false });
  }
};

const createPayment = async (
  cardInformation,
  setCardInformation,
  createPaymentInformation,
  setCreatePaymentInformation,
  coffeePrice,
  setCoffeePrice
) => {
  try {
    setCreatePaymentInformation({ loading: true });

    axios({
      method: "POST",
      // Local host doesn't work, use the IP (ifconfig -a)
      url: `${API_URL}/api/payments/create?total=${parseInt(
        coffeePrice
      )}&token=${cardInformation.token.tokenId}`,
    })
      .then((response) => {
        // console.log("Payment created", response);

        if (Platform.OS != "android")
          Snackbar.show({
            text: messagePaymentCreated,
            duration: Snackbar.LENGTH_SHORT,
          });
        else ToastAndroid.show(messagePaymentCreated, ToastAndroid.SHORT);

        setCardInformation({ loading: false, token: null });

        setCreatePaymentInformation({ loading: false, created: true });

        setCoffeePrice("500");
      })
      .catch((error) => {
        // console.log(error.message);

        if (Platform.OS != "android")
          Snackbar.show({
            text: error.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        else ToastAndroid.show(error.message, ToastAndroid.SHORT);

        setCardInformation({ loading: false, token: null });

        setCreatePaymentInformation({ loading: false });
      });
  } catch (error) {
    // console.log(error.message);

    if (Platform.OS != "android")
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    else ToastAndroid.show(error.message, ToastAndroid.SHORT);

    setCreatePaymentInformation({ loading: false });
  }
};

const PaymentCard = ({ coffeePrice, setCoffeePrice }) => {
  const [cardInformation, setCardInformation] = useState({
    loading: false,
    token: null,
  });

  const [createPaymentInformation, setCreatePaymentInformation] = useState({
    loading: false,
  });

  return (
    <View style={styles.container}>
      <PaymentButton
        text="Card details"
        loading={cardInformation.loading}
        onPress={() => processCardDetails(cardInformation, setCardInformation)}
      />

      {cardInformation.token ? (
        <PaymentButton
          text="Make payment"
          loading={createPaymentInformation.loading}
          onPress={() =>
            createPayment(
              cardInformation,
              setCardInformation,
              createPaymentInformation,
              setCreatePaymentInformation,
              coffeePrice,
              setCoffeePrice
            )
          }
          style={{ backgroundColor: theme.color.green.main }}
        />
      ) : null}

      {createPaymentInformation.created ? (
        <>
          <AnimatedEmoji
            index={1}
            style={{ bottom: -50 }}
            name={"coffee"}
            size={25}
            duration={3500}
            onAnimationCompleted={() => {}}
          />

          <AnimatedEmoji
            index={1}
            style={{ bottom: -100 }}
            name={"coffee"}
            size={30}
            duration={3500}
            onAnimationCompleted={() => {}}
          />

          <AnimatedEmoji
            index={1}
            style={{ bottom: -150 }}
            name={"coffee"}
            size={25}
            duration={3500}
            onAnimationCompleted={() => {}}
          />

          <AnimatedEmoji
            index={1}
            style={{ bottom: -200 }}
            name={"coffee"}
            size={35}
            duration={3500}
            onAnimationCompleted={() => {}}
          />

          <AnimatedEmoji
            index={1}
            style={{ bottom: -250 }}
            name={"coffee"}
            size={25}
            duration={3500}
            onAnimationCompleted={() => {}}
          />

          <AnimatedEmoji
            index={1}
            style={{ bottom: -300 }}
            name={"coffee"}
            size={30}
            duration={3500}
            onAnimationCompleted={() => {}}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PaymentCard;
