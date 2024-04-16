import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import ChatsScreen from "../screens/app/chats-screen";
import ChatScreen from "../screens/app/chat-screen";

const Stack = createStackNavigator();

const ChatsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatsNavigation;
