import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type PaymentNavProp = NativeStackNavigationProp<RootStackParamList, "Payment">;

interface PaymentProps {
  navigation: PaymentNavProp;
}

export default function PaymentScreen({ navigation }: PaymentProps) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert("Missing Details", "Please fill in all payment fields.");
      return;
    }

    // Basic validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      Alert.alert("Invalid Card Number", "Card number must be 16 digits.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      Alert.alert("Invalid Expiry Date", "Use MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      Alert.alert("Invalid CVV", "CVV must be 3 digits.");
      return;
    }

    Alert.alert(
      "Payment Successful 💳",
      "Thank you! Your booking and payment have been confirmed.",
      [
        {
          text: "Return to Home",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  const maskCardNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    return cleaned
      .padEnd(16, "*")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.cardPreview}>
        <Text style={styles.previewLabel}>Card Preview</Text>
        <View style={styles.cardMock}>
          <Text style={styles.mockNumber}>{maskCardNumber(cardNumber)}</Text>
          <Text style={styles.mockName}>{cardName || "CARD HOLDER"}</Text>
          <Text style={styles.mockExpiry}>{expiry || "MM/YY"}</Text>
        </View>
      </View>

      <TextInput
        placeholder="Cardholder Name"
        value={cardName}
        onChangeText={setCardName}
        style={styles.input}
      />
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        maxLength={16}
        style={styles.input}
      />
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        value={expiry}
        onChangeText={setExpiry}
        style={styles.input}
        maxLength={5}
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
        maxLength={3}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fffaf0",
    padding: 20,
  },
  backButton: {
    color: "#bfa14a",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#bfa14a",
    textAlign: "center",
    marginBottom: 20,
  },
  cardPreview: {
    alignItems: "center",
    marginBottom: 20,
  },
  previewLabel: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  cardMock: {
    width: "90%",
    height: 180,
    backgroundColor: "#bfa14a",
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
  },
  mockNumber: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 20,
  },
  mockName: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
  mockExpiry: {
    color: "#fff",
    fontSize: 14,
    alignSelf: "flex-end",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#bfa14a",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
