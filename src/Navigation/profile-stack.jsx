import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import MyProfileScreen from "../screens/app/my-profile-screen";
import EditInformation from "../screens/app/edit-information";
import NewPostScreen from "../screens/app/new-post-screen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-index"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-edit"
        component={EditInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-post"
        component={NewPostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
