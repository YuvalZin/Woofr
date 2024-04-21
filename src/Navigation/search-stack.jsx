import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import SearchScreen from "../screens/app/search-screen";
import otherProfileScreen from "../screens/app/other-profile-screen";

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
        component={otherProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
