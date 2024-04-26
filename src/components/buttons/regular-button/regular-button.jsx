// regular-button.tsx

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//App color palate
import { colorPalate } from "../../../utils/ui/colors";

const RegularButton = ({ text, onPress, color, iconName }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
      {iconName && <Ionicons name={iconName} size={24} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 5,
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 21,
    textAlign: "left",
    padding: 4,
    color: colorPalate.white,
  },
});

export default RegularButton;
