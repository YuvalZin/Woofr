// regular-button.tsx

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import custom components
import RegularText from "../../texts/regular-text/regular-text";

const RegularButton = ({ text, onPress, color, iconName }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      {iconName && (
        <Ionicons name={iconName} size={24} color="white" style={styles.icon} />
      )}
      <RegularText text={text} />
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
  },
  icon: {
    marginRight: 10,
  },
});

export default RegularButton;
