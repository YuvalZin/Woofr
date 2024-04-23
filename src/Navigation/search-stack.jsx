import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import SearchScreen from "../screens/app/search-screen";
import OtherProfileScreen from "../screens/app/other-profile-screen";
import ChatScreen from "../screens/app/chat-screen";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search-index"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search-profile"
        component={OtherProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search-chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
