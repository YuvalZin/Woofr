import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/app/home-screen";
import ProfileScreen from "../screens/app/other-profile-screen";
import ChatScreen from "../screens/app/chat-screen";
import NewPostScreen from "../screens/app/new-post-screen";
import ProfessionalsScreen from "../screens/app/professionals-screen";

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
        name="chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home-post"
        component={NewPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home-professionals"
        component={ProfessionalsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
