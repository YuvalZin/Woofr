import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/app/home-screen";
import ProfileScreen from "../screens/app/profile-screen";

const Stack = createStackNavigator();

const ChatsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home-index"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home-profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatsStack;
