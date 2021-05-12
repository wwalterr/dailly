import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

import { PaymentsStripe as Stripe } from "expo-payments-stripe";

import axios from "axios";

import theme from "../theme";

import PaymentButton from "./paymentButton";

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
    console.log(error.message);

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
      url: `http://192.168.0.107:4000/api/payments/create?total=${coffeePrice}&token=${cardInformation.token.tokenId}`,
    })
      .then((response) => {
        // console.log("Payment created");

        setCardInformation({ loading: false, token: null });

        setCreatePaymentInformation({ loading: false });

        setCoffeePrice("500");
      })
      .catch((error) => {
        console.log(error.message);

        setCardInformation({ loading: false, token: null });

        setCreatePaymentInformation({ loading: false });
      });
  } catch (error) {
    console.log(error.message);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PaymentCard;
