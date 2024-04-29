import React from "react";
import { StyleSheet, Text } from "react-native";

const SmallText = ({ text, english = false }) => {
  const textAlign = !english ? "left" : "right";
  return <Text style={[styles.text, { textAlign }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
  },
});

export default SmallText;
