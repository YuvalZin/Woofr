//regular-text.jsx

import React from "react";
import { StyleSheet, Text } from "react-native";

const RegularText = ({ text, english = false }) => {
  const textAlign = english ? "right" : "left";
  return <Text style={[styles.text, { textAlign }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    padding: 4,
  },
});

export default RegularText;
