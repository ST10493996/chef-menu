import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuContext } from "../context/MenuContext";

type BookingScreenRouteParams = {
  selectedIds: string[];
};

type BookingProps = {
  navigation: any;
  route: { params: BookingScreenRouteParams };
};

export default function BookingScreen({ navigation, route }: BookingProps) {
  const { dishes } = useContext(MenuContext);
  const { selectedIds } = route.params;

  // Filter selected dishes from all dishes
  const selectedDishes = dishes.filter((dish) => selectedIds.includes(dish.id));

  // Date and Time
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");

  // Contact info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState(""); // Number of people

  const [showContactForm, setShowContactForm] = useState(false);

  const handleProceedToContact = () => {
    if (!day || !month || !year || !time) {
      Alert.alert("Please select day, month, year, and time.");
      return;
    }
    setShowContactForm(true);
  };

  const handleConfirmBooking = () => {
    if (!name || !phone || !email || !people) {
      Alert.alert("Please fill in all contact fields.");
      return;
    }

    const bookingDate = `${day}/${month}/${year} at ${time}`;

   Alert.alert(
  "Booking Confirmed!",
  `Thank you ${name}! Your booking for ${people} person(s) and ${selectedDishes.length} meal(s) is confirmed on ${bookingDate}. We will contact you at ${phone} or ${email}.`,
  [
    {
      text: "Proceed to Payment",
      onPress: () => navigation.navigate("Payment"),
    },
  ]
);

  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 5 }, (_, i) => (2025 + i).toString());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Make a Booking</Text>

      <Text style={styles.subTitle}>Selected Meals</Text>
      {selectedDishes.map((dish) => (
        <View key={dish.id} style={styles.dishCard}>
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.dishCourse}>{dish.course}</Text>
          <Text style={styles.dishPrice}>R{dish.price}</Text>
        </View>
      ))}

      {!showContactForm && (
        <>
          <Text style={styles.subTitle}>Select Date & Time</Text>
          <View style={styles.pickerRow}>
            <Picker selectedValue={day} onValueChange={setDay} style={styles.picker}>
              <Picker.Item label="Day" value="" />
              {days.map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
            <Picker selectedValue={month} onValueChange={setMonth} style={styles.picker}>
              <Picker.Item label="Month" value="" />
              {months.map((m) => (
                <Picker.Item key={m} label={m} value={m} />
              ))}
            </Picker>
            <Picker selectedValue={year} onValueChange={setYear} style={styles.picker}>
              <Picker.Item label="Year" value="" />
              {years.map((y) => (
                <Picker.Item key={y} label={y} value={y} />
              ))}
            </Picker>
          </View>

          <TextInput
            placeholder="Time (e.g. 18:30)"
            value={time}
            onChangeText={setTime}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleProceedToContact}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </>
      )}

      {showContactForm && (
        <>
          <Text style={styles.subTitle}>Your Contact Details</Text>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Number of People"
            value={people}
            onChangeText={setPeople}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </>
      )}
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
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  dishCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  dishName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dishCourse: {
    fontSize: 14,
    color: "#bfa14a",
  },
  dishPrice: {
    fontSize: 14,
    color: "#444",
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
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
