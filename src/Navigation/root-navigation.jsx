//root-navigation.js

import React, { useEffect, useState } from "react";

//Import react-native navigation element
import { NavigationContainer } from "@react-navigation/native";

//Import navigation for the root
import AuthNavigation from "./auth-navigation";
import AppNavigation from "./app-navigation";

//Redux handler state management
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, login } from "../redux/authSlice";

// Store package for react native expo
import * as SecureStore from "expo-secure-store";
import { GetUserData } from "../utils/api/user";

const RootNavigation = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data from SecureStore
    const fetchUserFromSecureStore = async () => {
      try {
        SecureStore.deleteItemAsync("token");
        const token = SecureStore.getItem("token");
        if (token) {
          const userData = await GetUserData(token);
          dispatch(login(JSON.stringify(userData)));
        }
      } catch (error) {
        console.error("Error fetching user data from SecureStore:", error);
      }
      setIsLoading(false);
    };

    fetchUserFromSecureStore();
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
