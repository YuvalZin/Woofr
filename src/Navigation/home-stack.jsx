import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/app/home-screen";
import ProfileScreen from "../screens/app/profile-screen";
import ChatScreen from "../screens/app/chat-screen";

const Stack = createStackNavigator();

const HomeStack = () => {
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
      <Stack.Screen
        name="home-chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
