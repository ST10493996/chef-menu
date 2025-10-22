import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MenuContext } from "../context/MenuContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, "Home">;

interface HomeProps {
  navigation: HomeScreenNavProp;
}

export default function HomeScreen({ navigation }: HomeProps) {
  const { dishes } = useContext(MenuContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>

      {/* 👇 Total number of dishes */}
      <Text style={styles.total}>
        Total Dishes: {dishes.length}
      </Text>

      {dishes.length === 0 ? (
        <Text style={styles.empty}>No dishes yet. Add one below.</Text>
      ) : (
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>R{item.price}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddDish")}
      >
        <Text style={styles.addButtonText}>＋ Add Dish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#bfa14a",
    textAlign: "center",
    marginVertical: 15,
  },
  total: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginVertical: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  course: {
    fontSize: 14,
    color: "#bfa14a",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  price: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#bfa14a",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
