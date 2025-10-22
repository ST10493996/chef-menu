import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { MenuProvider } from "./context/MenuContext";
import HomeScreen from "./screens/HomeScreen";
import AddDishScreen from "./screens/AddDishScreen";

export type RootStackParamList = {
  Home: undefined;
  AddDish: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: "#fff" },
              headerTintColor: "#bfa14a",
              contentStyle: { backgroundColor: "#fff" },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Christoffel's Menu" }}
            />
            <Stack.Screen
              name="AddDish"
              component={AddDishScreen}
              options={{ title: "Add Dish" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
