import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Assistant_400Regular } from '@expo-google-fonts/assistant';

// App color palate
import { colorPalate } from "../../../utils/ui/colors";

const RegularButtonFullW = ({ text, onPress, color, iconName, loading = false }) => {
  // Load the Assistant font
  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return null; // or any loading indicator while fonts are loading
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      {!loading ? (
        <>
          <Text style={styles.text}>{text}</Text>
        </>
      ) : (
        <ActivityIndicator color={colorPalate.white} size={32} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    padding: 4,
    fontFamily: 'Assistant_400Regular', // Use Assistant regular font
    color: "black",
  },
});

export default RegularButtonFullW;
